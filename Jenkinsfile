node {
  stage 'Verificar'
  git url: 'https://github.com/katerinemm94/backend-integracion-continua.git'

  stage 'Compilar'
  docker.build('.')

  stage 'Depurar'
  sh './deploy.sh'
}