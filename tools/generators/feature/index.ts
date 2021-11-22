import { Tree, formatFiles, generateFiles, joinPathFragments } from '@nrwl/devkit';
import { strings } from '@angular-devkit/core';
import { parseJson, serializeJson } from '@nrwl/tao/src/utils/json';

interface NewFeatureOptions {
  name: string;
  domainname: string;
  type: 'basic' | 'list' | 'form-part';
}

export default async function (tree: Tree, schema: NewFeatureOptions) {
  await featureGenerator(tree, schema);
  await addDomainToEslint(tree, schema.domainname);
  await formatFiles(tree);
  return () => {
    // installPackagesTask(tree);
  };
}

async function featureGenerator(tree: Tree, schema: NewFeatureOptions) {
  const featuresPath = '/libs/features/src/lib/';
  const domainName = schema.domainname;
  const featureType = schema.type;
  let featureName = schema.name;
  let selector = domainName + '-' + strings.dasherize(featureName);

  if (featureType !== 'basic') {
    featureName += '-' + featureType;
    selector += '-' + featureType;
  }
  const className = strings.classify(featureName);
  const componentName = className + 'Component';
  const targetPath = featuresPath + domainName + '/' + featureName;
  generateFiles(
    tree, // the virtual file system
    joinPathFragments(__dirname, './files/' + featureType), // path to the file templates
    targetPath, // destination path of the files
    {
      ...schema, // config object to replace variable in file templates
      className,
      componentName,
      domainName,
      featureName,
      selector,
      classify: strings.classify,
      dasherize: strings.dasherize
    }
  );
}

async function addDomainToEslint(tree: Tree, domain: string) {
  const esLintPath = '/libs/features/.eslintrc.json';
  const esLint: Eslint = parseJson(tree.read(esLintPath, 'utf-8'));
  const tsOverrides = esLint.overrides;
  const rules = tsOverrides.find((override) => override.files.includes('*.ts')).rules;
  let prefixes = rules['@angular-eslint/component-selector'][1].prefix;
  if (typeof prefixes === 'string') {
    prefixes = [prefixes];
  }
  if (prefixes.includes(domain)) {
    return;
  }
  prefixes = [...prefixes, strings.dasherize(domain)];
  rules['@angular-eslint/component-selector'][1].prefix = prefixes;
  rules['@angular-eslint/directive-selector'][1].prefix = prefixes;
  tree.write(esLintPath, serializeJson(esLint));
}

interface Eslint {
  extends: string[];
  ignorePatterns: string[];
  overrides: Override[];
}

interface Override {
  files: string[];
  extends: string[];
  rules: any;
}
