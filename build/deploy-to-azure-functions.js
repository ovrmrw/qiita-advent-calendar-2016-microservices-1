const execSync = require('child_process').execSync;

const DEPLOY_BRANCH = 'deploy-azure';


const check = execSync('git add -n -A').toString();
if (check) {
  console.log('"git add -n -A" ===>\n', check);
  console.error('========================================');
  console.error('** Commit file changes before deploy! **');
  console.error('========================================');
  return;
}


const commands = [
  'git branch ' + DEPLOY_BRANCH,
  'git checkout ' + DEPLOY_BRANCH,
  'git rebase master',
  'npm run tsc:azure',
  // 'npm run webpack:prod',
  // 'node build/copy-bundled-files.js',
  'git add -A',
  'git commit -m "deploy"',
  'git push origin ' + DEPLOY_BRANCH + ' -f',
  'git checkout master',
  'git branch -D ' + DEPLOY_BRANCH,
  'node build/delete-jsmap-files.js',
];

commands.forEach(command => {
  console.log('='.repeat(20), command);
  try {
    const result = execSync(command).toString();
    console.log('result:', result);
  } catch (err) {
    throw err;
  }
});
