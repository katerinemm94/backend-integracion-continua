node {
  stage 'Verificar'
  git url: 'https://github.com/katerinemm94/backend-integracion-continua.git'

  stage 'Compilar imagen'
  docker.build('integracion_continua_katerine')

  stage 'Lanzar imagenes'
  sh '''chmod a+x ./deploy.sh
./deploy.sh'''

}