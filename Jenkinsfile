node {
  stage 'Verificar'
  git url: 'https://github.com/katerinemm94/backend-integracion-continua.git'

  stage 'Compilar'
  docker.build('integracion_continua_katerine')

  stage 'Depurar'
  sh '''chmod a+x ./deploy.sh
./deploy.sh'''

}