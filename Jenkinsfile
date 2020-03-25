// pipeline {
//    agent any

//    stages {
//       stage('setup') {
//           steps {
//               sh "curl-sL https://deb.nodesource.com/setup_8.x |sudo-Ebash- "
//               sh "sudo apt install -y nodejs"
//           }
//       }
//       stage('clone') {
//          steps {
//             sh "rm -rf *"
//             git credentialsId: 'Github', url: 'https://github.com/fuosseuf/tchat.git'
//          }
//       }
//       stage('build') {
//          steps {
//             sh "rm -rf node-modules"
//             sh "npm i"
//          }
//       }
//       stage('run') {
//          steps {
//             sh "node server.js"
//          }
//       }
//    }
// }

node {
    docker.image('nginx:latex').withRun('-p 80:80') {
        c ->
        sh "docker ps"
        sh "curl localhost"
    }
}