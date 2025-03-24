# Ionic SQLite Skeleton

![Logo](https://i.ytimg.com/vi/1HQEzdssoCQ/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGCEgQCh_MA8=&rs=AOn4CLBYTHvKU3WEYism-UvEIL5rcPEGoQ)

## Descripción
Este proyecto es un esqueleto básico para crear aplicaciones móviles con [Ionic](https://ionicframework.com/) que implementan [SQLite](https://www.sqlite.org/) como base de datos local, y utiliza [TypeORM](https://typeorm.io/) para la gestión de entidades y operaciones de base de datos. Es ideal para aquellos que necesiten almacenar y manipular datos de manera eficiente en dispositivos móviles, incluso sin conexión a internet.

## Uso como Template
Si deseas crear un nuevo repositorio utilizando este proyecto como base, haz clic en el botón "Use this template" en la parte superior derecha de este repositorio para generar tu propio repositorio a partir de él.

## Tutorial

He escrito un tutorial detallado explicando cómo usar este proyecto paso a paso. Puedes leerlo aquí:  
📖 [Leer el tutorial](https://davidsanluisaguirre.com/posts/ionic-sqlite/)


## Requisitos Previos

Antes de iniciar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/)
- [Ionic CLI](https://ionicframework.com/docs/cli) 
- [Capacitor](https://capacitorjs.com/) para acceder a las capacidades nativas del dispositivo

## Instalación

Clona este repositorio en tu máquina local e instala las dependencias:

```bash
git clone https://github.com/Davidsmait/sqlite-capacitor-ionic-skeleton
cd sqlite-capacitor-ionic-skeleton
npm install
```

## Agregar plataformas
Para ejecutar la aplicación en dispositivos físicos o emuladores, es necesario agregar las plataformas correspondientes. Aquí te mostramos cómo hacerlo.

### Android
Agrega la plataforma Android al proyecto con los siguientes comandos:

```bash
npx cap add android

npx cap open android
```
Esto abrirá el proyecto en Android Studio, donde podrás emular la aplicación o desplegarla en un dispositivo físico.

### iOS
Para iOS, usa los siguientes comandos:

```bash
npx cap add ios

npx cap open ios
```

Esto abrirá el proyecto en Xcode, donde podrás ejecutar la aplicación en un simulador de iOS o un dispositivo físico.

## Construye el proyecto
Para compilar generar el folder .www y preparar el proyecto para su ejecución en dispositivos o entornos de producción, sigue estos pasos:


```bash
ng build
npx cap sync
```


## Ejecución en dispositivos o emuladores
Una vez que hayas agregado las plataformas, puedes compilar y desplegar la aplicación en un dispositivo o emulador.

### Android
Para compilar y ejecutar la aplicación en Android:

```bash
ionic capacitor run android -l --external
```
Este comando compilará la aplicación, abrirá el emulador o tu dispositivo conectado, y permitirá recargar automáticamente la aplicación cada vez que realices un cambio en el código.

### iOS
Para iOS, utiliza el siguiente comando:

```bash
ionic capacitor run ios --l
```
