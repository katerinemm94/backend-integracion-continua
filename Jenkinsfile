node {
  stage 'Verificar'
  git url: 'https://github.com/katerinemm94/backend-integracion-continua.git'

  stage 'Compilar'
  docker.build('integracion_continua_katerine')

  stage 'Depurar'
  sh '''chmod a+x ./deploy.sh
./deploy.sh'''

// stage 'Instalar'
//   sh '''chmod a+x ./entrypoint.sh
// ./entrypoint.sh'''

// stage 'Migrar'
//   sh '''chmod a+x ./migrar.sh
// ./migrar.sh'''

// stage 'Levantar'
//   sh '''chmod a+x ./correr.sh
// ./correr.sh'''

}