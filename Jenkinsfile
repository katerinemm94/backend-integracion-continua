node {
  stage 'Verificar repositorio'
  git url: 'https://github.com/katerinemm94/backend-integracion-continua.git'

  stage 'Bajar docker-compose'
  sh 'docker-compose down'

  stage 'Hacer pull última imagen publicada en docker-hub'
  sh 'docker-compose pull'

  stage 'Lanzar imagenes'
  sh 'docker-compose up -d'

}