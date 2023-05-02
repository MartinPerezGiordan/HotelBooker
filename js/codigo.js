window.addEventListener("load",inicio);

function inicio(){
    document.querySelector("#btnLogin").addEventListener("click",login);
    document.querySelector("#btnRegis").addEventListener("click",registrarse);
    document.querySelector("#cerrarSesionL").addEventListener("click",cerrarSesion);
    document.querySelector("#cerrarSesionP").addEventListener("click",cerrarSesion);
    document.querySelector("#disponibilidad").addEventListener("click",disponibilidad);
    document.querySelector("#btnHabilitar").addEventListener("click",habilitar);
    document.querySelector("#btnDeshabilitar").addEventListener("click",deshabilitar);
    document.querySelector("#solicitarReserva").addEventListener("click",mnuSolicitarReserva);
    document.querySelector("#btnReservar").addEventListener("click",reservar);
    document.querySelector("#btnCancelarReserva").addEventListener("click",cancelarReserva);
    document.querySelector("#calificarReserva").addEventListener("click",mnuCalificarReserva);
    document.querySelector("#btnCalificar").addEventListener("click",calificarReservaFinalizada);
    document.querySelector("#reservasPendientes").addEventListener("click",mnuReservasPendientes);
    document.querySelector("#estadoReservas").addEventListener("click",mnuEstadoReservas);
    document.querySelector("#btnFinalizar").addEventListener("click",finalizarReserva);
    document.querySelector("#cupoMaximo").addEventListener("click",mnuCupoMaximo);
    document.querySelector("#btnCambiarCupoMaximo").addEventListener("click",cambiarCupoMaximo);
    document.querySelector("#infoEstadisticaLocales").addEventListener("click",mnuInfoEstadisticaLocales);
    document.querySelector("#infoEstadisticaPersonas").addEventListener("click",mnuInfoEstadisticaPersonas);
    document.querySelector("#btnBuscar").addEventListener("click",buscarNombre);


    ocultarTodo();
    precargarUsuariosLocales();
    precargarUsuariosPersona();
    precargarReservas();

}

//Esta funcion borra los mensajes de cada menu
function borrarMensajes(){
    document.querySelector("#msjLogin").innerHTML=""
    document.querySelector("#msjRegis").innerHTML=""
    document.querySelector("#msjBusqueda").innerHTML=""
    document.querySelector("#msjEstadoReservas").innerHTML=""
    document.querySelector("#msjCupoMaximo").innerHTML=""
    document.querySelector("#msjCupoMaximoActual").innerHTML=""
    document.querySelector("#msjReserva").innerHTML=""
    document.querySelector("#msjCancelarReserva").innerHTML=""
    document.querySelector("#msjAgregarCalificacion").innerHTML=""
    document.querySelector("#msjReservasPendientes").innerHTML=""


}

function ocultarTodo(){
    document.querySelector("#mnuLocal").style.display="none";
    document.querySelector("#mnuPersona").style.display="none";
    ocultarFuncionLocal();
    ocultarFuncionPersona();
    borrarMensajes();
}

//Esta funcion oculta cualquier opcion que haya abierto el usuario local
function ocultarFuncionLocal(){
    borrarMensajes();
    document.querySelector("#mnuDisponibilidad").style.display="none";
    document.querySelector("#mnuEstadoReservas").style.display="none";
    document.querySelector("#mnuCupoMaximo").style.display="none";
    document.querySelector("#mnuInfoEstadisticaLocales").style.display="none";

}

//Esta funcion oculta cualquier opcion que haya abierto el usuario persona
function ocultarFuncionPersona(){
    borrarMensajes();
    document.querySelector("#mnuSolicitarReserva").style.display="none";
    document.querySelector("#mnuCalificarReserva").style.display="none";
    document.querySelector("#mnuReservasPendientes").style.display="none";
    document.querySelector("#mnuInfoEstadisticaPersonas").style.display="none";

}

// --------------------------- LOGIN ---------------------------------
let listaLocales=[];
let posUsuarioLogueado=-1;//esta variable me dice la posicion del usuario que se logueo dentro de la lista personas o locales

function login(){
    let userSensitive = document.querySelector("#txtUserLogin").value;
    let user = userSensitive.toLowerCase()//Lo que digita el usuario pasado a minusculas para que sea case insensitive
    let pass = document.querySelector("#txtPassLogin").value;
    let posUser = existeUsuario(user); //Me da la posicion del usuario (si existe, sino =-1)
    let tipo = tipoUsuario(user); //Me dice si el usuario es local(0) o persona(1)
    let coincide=false;

    if (posUser!=-1){//Esa condicion significa "si el usuario existe"
        if(tipo==0){
        coincide=contraseñaCoincideL(pass,posUser) //Esta funcion invocada me retorna true si la contraseña coincide con el usuario si es local
       }
       if(tipo==1){
        coincide=contraseñaCoincideP(pass,posUser) //Esta funcion invocada me retorna true si la contraseña coincide con el usuario si es persona
       }
    }
    else{
        document.querySelector("#msjLogin").innerHTML="Usuario no existe"
    }

    if(coincide){
        if(tipo==0){
        document.querySelector("#mnuLocal").style.display="block"; //si coincide y es local se despliega el menu para Locales
        document.querySelector("#mnuLogin").style.display="none";
        document.querySelector("#mnuRegistrar").style.display="none";
        
        //El for a continuacion guarda en la variable "posUsuarioLogueado" la posicion del usuario (Local) que se logueo, esta posicion 
        //me va a ser util mas adelante en otras funciones.
        for(let pos0=0;pos0<listaLocales.length;pos0++){
            let posicionUsuario=listaLocales[pos0]
            if(posicionUsuario.usuario==user){
                posUsuarioLogueado=pos0
            }
        }
        }

        if(tipo==1){
            document.querySelector("#mnuPersona").style.display="block"; //si coincide y es persona se despliega el menu para personas
            document.querySelector("#mnuLogin").style.display="none";
            document.querySelector("#mnuRegistrar").style.display="none";

            //El for a continuacion guarda en la variable "posUsuarioLogueado" la posicion del usuario (Persona) que se logueo, esta posicion 
            //me va a ser util mas adelante en otras funciones.
            for(let pos1=0;pos1<listaPersonas.length;pos1++){
                let posicionUsuario=listaPersonas[pos1]
                if(posicionUsuario.usuario==user){
                    posUsuarioLogueado=pos1
                }
            }
        }

    }

    document.querySelector("#txtUserLogin").value=""
    document.querySelector("#txtPassLogin").value=""
}

function existeUsuario(user){

    //Esta funcion me dice si ya existe ese nombre de usuario ingresado tanto en Locales como en Personas
    // si existe retorna la posicion en que se encuentra en el array, sino retorna -1

    let posUser=-1
    for(pos=0;pos<listaLocales.length;pos++){
        if(listaLocales[pos].usuario.toLowerCase()==user){
            posUser=pos
        }
    }
    for(pos=0;pos<listaPersonas.length;pos++){
        if(listaPersonas[pos].usuario.toLowerCase()==user){
            posUser=pos
        }
    }
    return posUser
}

function tipoUsuario(user){

    //Esta funcion me dice si este usuario fue encontrado en la lista de locales (0) o de personas (1)

    let tipo=0
    for(pos=0;pos<listaLocales.length;pos++){
        if(listaLocales[pos].usuario==user){
            tipo=0
        }
    }
    for(pos=0;pos<listaPersonas.length;pos++){
        if(listaPersonas[pos].usuario==user){
            tipo=1
        }
    }
    return tipo
}

function contraseñaCoincideL(pass,posUser){
    let coincide=false
        if(listaLocales[posUser].contraseña==pass){//este if me dice si el usuario y la contra coinciden si el usuario es local
            coincide=true
        }
        else{
        document.querySelector("#msjLogin").innerHTML="Contraseña incorrecta"//Si no coincide se muestra este mensaje
        }
    return coincide
}

function contraseñaCoincideP(pass,posUser){
    let coincide=false
        if(listaPersonas[posUser].contraseña==pass){//este if me dice si el usuario y la contra coinciden si el usuario es persona
            coincide=true
        }
        else{
            document.querySelector("#msjLogin").innerHTML="Contraseña incorrecta"//Si no coincide se muestra este mensaje
            }
    return coincide
}

// --------------------------- REGISTRAR PERSONA ---------------------------------
let listaPersonas=[];

function registrarse(){
let nameP = document.querySelector("#txtNameRegis").value;
let userP = document.querySelector("#txtUserRegis").value;
let passP = document.querySelector("#txtPassRegis").value;

if(nameP==""||userP==""||passP==""){
    document.querySelector("#msjRegis").innerHTML="Completar todos los campos" //Si el usuario no llena todos los campos no se puede registrar
}
else{
    if(existeUsuario(userP)==-1){ //el usuario no debe exisitir
        if(contraseñaValida(passP)){
            registrarPersona(nameP,userP,passP);
            document.querySelector("#msjRegis").innerHTML="Registro exitoso"
            document.querySelector("#txtNameRegis").value=""
            document.querySelector("#txtPassRegis").value=""
            document.querySelector("#txtUserRegis").value=""

        }
        else{
            document.querySelector("#msjRegis").innerHTML="La contraseña seleccionada no cumple con los requisitos minimos (6 caracteres, al menos una mayúscula, una minúscula y un numero)"
            document.querySelector("#txtPassRegis").value=""

        }
    }
    else{
        document.querySelector("#msjRegis").innerHTML="El usuario elegido ya existe, por favor elija otro"
        document.querySelector("#txtUserRegis").value=""
        document.querySelector("#txtPassRegis").value=""
    }
}
}

function contraseñaValida(passP){
    let valida=false;
    let mayus=false;
    let minus=false;
    let numero=false;
    let cantidadCaracteres=false;

    //La contraseña debe tener mas de 6 caracteres
    if(passP.length>5){
        cantidadCaracteres=true
    }

    //La contraseña debe tener al menos una mayuscula
    for(let pos=0;pos<passP.length;pos++){
        let letra=passP.charAt(pos);
        if(letra==letra.toUpperCase()){
            mayus=true
        }
    }

    //La contraseña debe tener al menos una minuscula
    for(let pos1=0;pos1<passP.length;pos1++){
        let letra1=passP.charAt(pos1);
        if(letra1==letra1.toLowerCase()){
            minus=true
        }
    }

    //La contraseña debe tener al menos un numero
    for(let pos3=0;pos3<passP.length;pos3++){
        let letra3=passP.charAt(pos3);
        if(letra3=="0"||letra3=="1"||letra3=="2"||letra3=="3"||letra3=="4"||letra3=="5"||letra3=="6"||letra3=="7"||letra3=="8"||letra3=="9"){
            numero=true
        }
    }

    //si se cumplen todas las anteriores la variable "valida" retorna true
    if(mayus&&minus&&numero&&cantidadCaracteres){
        valida=true;
    }
    return valida;
}

function registrarPersona(nombre,usuario,contraseña){
    let objPersona=new persona(nombre,usuario,contraseña);
    listaPersonas.push(objPersona)

}


// ------------------------- P R E C A R G A   D E   D A T O S ---------------------------

// --- Precarga de Locales --

function precargarUsuariosLocales(){
    agregarLocales("Francis","rest1","123","restaurant","Av wilson 12",20,"fotos/foto4.jpg",true,0);
    agregarLocales("Hard Rock","rest2","223","restaurant","Av Italia 720",31,"fotos/foto5.jpg",true,0);
    agregarLocales("Gourmet","rest3","323","restaurant","Maximo Tajes 56",15,"fotos/foto6.jpg",true,0);
    agregarLocales("Louvre","mus1","113","museo","Av Uruguay 2666",22,"fotos/foto1.jpg",true,0);
    agregarLocales("Mucha Arte","mus2","123","museo","Valdivia 16",84,"fotos/foto2.jpg",true,0);
    agregarLocales("Shakespare","tea1","121","teatro","Divina Comedia 134",33,"fotos/foto8.jpg",true,0);
    agregarLocales("Grecia","tea2","122","teatro","Portezuelo 8",41,"fotos/foto3.jpg",true,0);
}

function agregarLocales(nombre,usuario,contraseña,tipoLocal,direccion,cupoMaximo,foto,estado,cuposOcupados){
    let objLocal=new local(nombre,usuario,contraseña,tipoLocal,direccion,cupoMaximo,foto,estado,cuposOcupados)
    listaLocales.push(objLocal)
}

// --- Precarga de Personas --

function precargarUsuariosPersona(){
    agregarPersonas("Martin","user1","123");
    agregarPersonas("Martina","user2","123");
    agregarPersonas("Pedro","user3","123");
    agregarPersonas("Juan","user4","123");
    agregarPersonas("Santiago","user5","123");

}

function agregarPersonas(nombre,usuario,contraseña){
    let objPersona=new persona(nombre,usuario,contraseña)
    listaPersonas.push(objPersona)
}

// --- Precarga de reservas ---

function precargarReservas(){
    agregarReservas(0,"Francis",3,"finalizada")
    agregarReservas(0,"Grecia",2,"pendiente")
    agregarReservas(0,"Grecia",1,"finalizada")
    agregarReservas(0,"louvre",1,"finalizada")
    agregarReservas(0,"Hard Rock",1,"pendiente")

    agregarReservas(1,"Hard Rock",4,"finalizada")
    agregarReservas(1,"Francis",4,"pendiente")

    agregarReservas(1,"Louvre",1,"pendiente")
    agregarReservas(2,"Shakespare",2,"pendiente")

    agregarReservas(3,"Shakespare",2,"finalizada")
    agregarReservas(3,"Gourmet",3,"finalizada")
    agregarReservas(3,"Gourmet",2,"pendiente")

    agregarReservas(4,"Mucha Arte",2,"pendiente")
    agregarReservas(4,"Mucha Arte",2,"finalizada")

}

function agregarReservas(pos,localElegido,cantidadReservada,estadoReserva){
    let objReserva=new reserva(localElegido,cantidadReservada,estadoReserva)
    listaPersonas[pos].listaReservas.push(objReserva)
}


// ------------------------ Cerrar Sesion -----------------------------

//Esta funcion cerrar sesion oculta los menues de persona o de local y muestra nuevamente el login

function cerrarSesion(){
    document.querySelector("#mnuLocal").style.display="none";
    document.querySelector("#mnuPersona").style.display="none";
    document.querySelector("#mnuLogin").style.display="block";
    document.querySelector("#mnuRegistrar").style.display="block";
    ocultarFuncionLocal();
    ocultarFuncionPersona();
}


// --------------------------------- F U N C I O N E S   L O C A L ------------------------------------------------


// ------------------------ Habilitar y deshabilitar disponibilidad -----------------------------

function disponibilidad(){
    ocultarFuncionLocal();
    document.querySelector("#mnuDisponibilidad").style.display="block";
    deshabilitarBtnHabilitar();

}

function habilitar(){
    listaLocales[posUsuarioLogueado].estado=true
    document.querySelector("#msjDisponibilidad").innerHTML="Local habilitado"
}

function deshabilitar(){
    listaLocales[posUsuarioLogueado].estado=false
    document.querySelector("#msjDisponibilidad").innerHTML="Local deshabilitado"
}

function deshabilitarBtnHabilitar(){
    //Si el cupo maximo es menor o igual a la cantidad de cupos ocupados se debe deshabilitar la opcion de volver a habilitar el local
    if(listaLocales[posUsuarioLogueado].cuposOcupados>=listaLocales[posUsuarioLogueado].cupoMaximo){
            document.querySelector("#btnHabilitar").disabled=true
            listaLocales[posUsuarioLogueado].estado=false
            document.querySelector("#msjDisponibilidad").innerHTML="Local deshabilitado"

    }
}

// ------------------------ Cambiar las reservas de estado -----------------------------

function mnuEstadoReservas(){
    ocultarFuncionLocal();
    document.querySelector("#mnuEstadoReservas").style.display="block";
    cargarSelectReservasPendientes();

}

function cargarSelectReservasPendientes(){
    document.querySelector("#sctReservaACambiar").innerHTML = "";

    let options = "";

    //Primero recorrer los objetos persona
    for(let pos=0;pos<listaPersonas.length;pos++){
        //Luego recorrer los objetos reserva de la persona
        for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length;pos1++){
            let objReserva=listaPersonas[pos].listaReservas[pos1]
            //Si se encuentran reserva pendientes con el mismo nombre que el Local logueado que las muestre.
            //Tiene que coincidir con el nombre del local logueado y ademas debe tener estado pendiente.
            if(listaLocales[posUsuarioLogueado].nombre==objReserva.localElegido && objReserva.estadoReserva=="pendiente"){
                //Se muestra el usuario del que reservo y la cantidad que reservo
                options+="<option value='"+listaPersonas[pos].id+"'>"+listaPersonas[pos].nombre+" ("+listaPersonas[pos].usuario+")"+" - "+listaPersonas[pos].listaReservas[pos1].cantidadReservada+" reservas"+"</option>"

            }
        }
    }
    document.querySelector("#sctReservaACambiar").innerHTML = options;    
}

//esta funcion es igual a la de cargar el select pero para mostrar en el select antes se fija si coincide con lo que busco el usuario
function buscarNombre(){
    let nombreABuscar=document.querySelector("#txtBuscarNombre").value
    document.querySelector("#msjBusqueda").innerHTML =""
    let options = "";

    for(let pos=0;pos<listaPersonas.length;pos++){
        for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length;pos1++){
            let objReserva=listaPersonas[pos].listaReservas[pos1]
            if(listaLocales[posUsuarioLogueado].nombre==objReserva.localElegido && objReserva.estadoReserva=="pendiente"){
                if(listaPersonas[pos].nombre.includes(nombreABuscar)){
                    options+="<option value='"+listaPersonas[pos].id+"'>"+listaPersonas[pos].nombre+" ("+listaPersonas[pos].usuario+")"+" - "+listaPersonas[pos].listaReservas[pos1].cantidadReservada+" reservas"+"</option>"
                }
            }
        }
    }
    document.querySelector("#sctReservaACambiar").innerHTML = options;

    if(options==""){
    document.querySelector("#msjBusqueda").innerHTML = "No hay clientes con ese nombre que tengan una reserva pendiente"
    }
    
}


function finalizarReserva(){
    let idPersonaQueReservo=document.querySelector("#sctReservaACambiar").value;

    //Primero recorrer los objetos persona
    for(let pos=0;pos<listaPersonas.length;pos++){
        //con este si encuentro a la persona con id que hizo la reserva
        if(listaPersonas[pos].id==idPersonaQueReservo){
            //Recorro las reservas de esa persona hasta encontrar la que coincida con el local logueado
            for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length;pos1++){
                let objReserva=listaPersonas[pos].listaReservas[pos1]
                //Cuando la encuentra le cambio la propiedad estadoReserva del objeto reserva a "finalizada"
                // la segunda parte del && es para que no me cambie las canceladas
                if(objReserva.localElegido==listaLocales[posUsuarioLogueado].nombre && objReserva.estadoReserva=="pendiente"){
                    objReserva.estadoReserva="finalizada"
                    document.querySelector("#msjEstadoReservas").innerHTML = "Se ha finalizado la reserva"   

                }
            }
        }
    }
    cargarSelectReservasPendientes();//Se vuelve a cargar el select tomando en cuenta que una dejo de ser "pendiente"
}


// ------------------------ Cambiar el cupo maximo -----------------------------

function mnuCupoMaximo(){
    ocultarFuncionLocal();
    document.querySelector("#mnuCupoMaximo").style.display="block";

    //Se muestra el cupo maximo actual del local
    document.querySelector("#msjCupoMaximoActual").innerHTML="El cupo maximo actual es de "+listaLocales[posUsuarioLogueado].cupoMaximo+" lugares";
}

function cambiarCupoMaximo(){
    let nuevoCupoMaximo=Number(document.querySelector("#txtCupoMaximoNuevo").value);

    if(noHayReservasPendientes()){
        if(nuevoCupoMaximo>0){//El cupo maximo nuevo debe ser mayor que 0
        listaLocales[posUsuarioLogueado].cupoMaximo=nuevoCupoMaximo;
        mnuCupoMaximo();
        document.querySelector("#msjCupoMaximo").innerHTML="Se ha modificado el cupo maximo"
        }
        else{
        document.querySelector("#msjCupoMaximo").innerHTML="Digitar un numero mayor que 0"
        }
    }
    else{
        document.querySelector("#msjCupoMaximo").innerHTML="Hay una reserva pendiente, no se puede modificar el cupo maximo"
    }
    document.querySelector("#txtCupoMaximoNuevo").value=""
}

function noHayReservasPendientes(){
    let resultado=true;

    //Primero recorrer los objetos persona
    for(let pos=0;pos<listaPersonas.length && resultado;pos++){
        //Luego recorrer los objetos reserva de la persona
        for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length && resultado;pos1++){
            let objReserva=listaPersonas[pos].listaReservas[pos1];
            //Si el la reserva esta hecha en el local logueado y esta en estado pendiente esta funcion retorna false, es decir que si hay reservas pendientes
            if(objReserva.localElegido==listaLocales[posUsuarioLogueado].nombre){
                if(objReserva.estadoReserva=="pendiente"){
                    resultado=false;
                }
            }
        }
    }
    return resultado
}


// ------------------------ Ver informacion estadistica -----------------------------

function mnuInfoEstadisticaLocales(){
    ocultarFuncionLocal();
    document.querySelector("#mnuInfoEstadisticaLocales").style.display="block";
    promedioCalificacionLocalLogueado();//Esta funcion muestra solamente el promedio de calificaciones del local logueado
    promedioCalificacionLocales();//Esta funcion muestra la tabla con todas los promedios de calificaciones
    let qPendientes=buscarReservasPendientesDelLocal()
    let qFinalizadas=buscarReservasFinalizadasDelLocal()

    let cupoMaximo=listaLocales[posUsuarioLogueado].cupoMaximo

    let porcentajeOcupacion=(qPendientes/cupoMaximo)*100
    document.querySelector("#porcentajeOcupacion").innerHTML="Porcentaje de ocupacion: "+porcentajeOcupacion+"%"

    document.querySelector("#reservasPendientesLocal").innerHTML="Reservas pendientes: "+qPendientes
    document.querySelector("#reservasFinalizadasLocal").innerHTML="Reservas finalizadas: "+qFinalizadas


}

function promedioCalificacionLocalLogueado(){
    //Esta funcion muestra solamente el promedio de calificaciones del local logueado
    let suma=0
    let cantidad=listaLocales[posUsuarioLogueado].calificaciones.length
    let promedio=0

    for(pos=0;pos<cantidad;pos++){
        let calificacion=listaLocales[posUsuarioLogueado].calificaciones[pos]
        suma=suma+calificacion
    }
    promedio=suma/cantidad
    
    if(cantidad>0){
    document.querySelector("#promedioCalificacion").innerHTML="Promedio de calificaciones: "+promedio
    }
    else{
    document.querySelector("#promedioCalificacion").innerHTML="Promedio de calificaciones: "+"Aun no hay calificaciones"
    }

}

function promedioCalificacionLocales(){
    document.querySelector("#tablaCalificaciones").innerHTML="";
    let tablaHTML = "<table>"
    tablaHTML +="<tr><th>Local</th><th>Promedio de Calificaciones</th></tr>"

    for(let pos=0;pos<listaLocales.length;pos++){
        let sumaCalificaciones=0
        //la cantidad de calificaciones que hay es el largo de la lista de calificaciones que tiene el local
        let cantidadCalificaciones=listaLocales[pos].calificaciones.length

        //este for recorre la lista de calificaciones de cada local y suma cada una a la variable sumaCalificaciones
        for(let pos1=0;pos1<listaLocales[pos].calificaciones.length;pos1++){
            sumaCalificaciones+=listaLocales[pos].calificaciones[pos1];
        }

        let promedioCalificacion=sumaCalificaciones/cantidadCalificaciones

        tablaHTML+="<tr><td>"+listaLocales[pos].nombre+"</td>";
        if(cantidadCalificaciones>0){
        tablaHTML+="<td>"+promedioCalificacion+"</td>";
        }
        else{
        tablaHTML+="<td>"+"No hay calificaciones"+"</td>";
        }
    }

    document.querySelector("#tablaCalificaciones").innerHTML =tablaHTML;
}

function buscarReservasPendientesDelLocal(){
    let cantidadReservasPendientesDelLocal=0
    //Recorrer la lista de personas
    for(let pos=0;pos<listaPersonas.length;pos++){
        //Recorrer la lista de reservas de cada persona
        for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length;pos1++){
            let objReserva=listaPersonas[pos].listaReservas[pos1]
            //Buscar una reserva que este en estado pendiente y que coincida con el nombre del local logueado
            if(objReserva.estadoReserva=="pendiente" && objReserva.localElegido==listaLocales[posUsuarioLogueado].nombre){
                //si encuentra le suma 1 a la cantidad de reservas en estado pendientes que tiene esa persona para ese local
                cantidadReservasPendientesDelLocal++
            }
        }
    }
    return cantidadReservasPendientesDelLocal
}

//Esta funcion es igual a la anterior pero busca la cantidad de reservas en estado "finalizada"
function buscarReservasFinalizadasDelLocal(){
    let cantidadReservasFinalizadasDelLocal=0
    //Recorrer la lista de personas
    for(let pos=0;pos<listaPersonas.length;pos++){
        //Recorrer la lista de reservas de cada persona
        for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length;pos1++){
            let objReserva=listaPersonas[pos].listaReservas[pos1]
            //Buscar una reserva que este en estado pendiente y que coincida con el nombre del local logueado
            if(objReserva.estadoReserva=="finalizada" && objReserva.localElegido==listaLocales[posUsuarioLogueado].nombre){
                //si encuentra le suma 1 a la cantidad de reservas en estado pendientes que tiene esa persona para ese local
                cantidadReservasFinalizadasDelLocal++
            }
        }
    }
    return cantidadReservasFinalizadasDelLocal
}

// --------------------------------- F U N C I O N E S   P E R S O N A ------------------------------------------------


// ------------------------ Solicitar reserva -----------------------------

let listaReservas=[];//Lista global que va a tener los objetos reserva

function mnuSolicitarReserva(){
    ocultarFuncionPersona();
    document.querySelector("#mnuSolicitarReserva").style.display="block";
    CargarSelectLocales();
    cargarSelectLocalesPendientes();
}

function CargarSelectLocales(){
    // Limpiar el select
    document.querySelector("#sctLocalAReservar").innerHTML = "";
    // Recorrer la lista de locales
    let options = "";
    for (let objLocal of listaLocales){
        // Agrega un local al select
        if(objLocal.estado){//Este if causa que solo se muestren en el select los locales habilitados
        options+="<option value='"+objLocal.nombre+"'>"+objLocal.id+"-"+objLocal.nombre+"</option>"
        }
    }
    document.querySelector("#sctLocalAReservar").innerHTML = options;    

}

function reservar(){
    let localElegido=document.querySelector("#sctLocalAReservar").value
    let cantidadElegida=Number(document.querySelector("#txtCantidadAReservar").value);


    for(let objLocal of listaLocales){

            //Si tiene una reserva pendiente en ese local no debe poder hacer reservas en el mismo
            if(objLocal.nombre==localElegido){
                if(reservaPendiente(localElegido)){
                    if(cantidadElegida>0){//Se debe seleccionar un numero mayor a 0
                        if(cantidadElegida<=(objLocal.cupoMaximo-objLocal.cuposOcupados)){

                            objLocal.cuposOcupados=objLocal.cuposOcupados+cantidadElegida

                            document.querySelector("#msjReserva").innerHTML="Se han solicitado "+cantidadElegida+" cupos"
                            document.querySelector("#txtCantidadAReservar").value=""
                            document.querySelector("#sctLocalAReservar").value=""

                            let objReserva=new reserva(localElegido,cantidadElegida,"pendiente");//Se crea un objeto reserva
                            listaPersonas[posUsuarioLogueado].listaReservas.push(objReserva);//Se guarda el objeto reserva en la lista de reservas

                            
                            cargarSelectLocalesPendientes();
                        }
                        else{
                            document.querySelector("#msjReserva").innerHTML="No hay suficientes cupos disponibles"
                        }
                    }
                    else{
                        document.querySelector("#msjReserva").innerHTML="Digitar un numero mayor a 0"
                    }
                }
                else{
                    document.querySelector("#msjReserva").innerHTML="Ya tiene una reserva pendiente en ese local"
                }
            }
        if(objLocal.cupoMaximo==objLocal.cuposOcupados){//Si el total de cupos ocupados alcanza el cupo maximo se deshabilita el local
            objLocal.estado=false
        }
    }

}
 


//Esta funcion se fija si dentro de el objeto persona que se logueo existe alguna reserva en el local el cual esta intentando reservar
//Si no hay reservas pendientes en ese local retorna true
//En caso opuesto retorna false
function reservaPendiente(localElegido){
    let NohayReservasPendientes=true;

    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length && NohayReservasPendientes;pos++){
        let reservaPendiente=listaPersonas[posUsuarioLogueado].listaReservas[pos].localElegido
        let estadoReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos].estadoReserva

        //para que se considere que hay una reserva pendiente debe coincidir el local que eligio el usuario para reservar
        //con el nombre en el listado de sus reservas pendientes
        //y esa reserva debe tener estado pendiente
        if(reservaPendiente==localElegido && estadoReserva=="pendiente"){

            NohayReservasPendientes=false;
        }
    }        
    

    return NohayReservasPendientes
}


// ------------------------ Cancelar reserva -----------------------------

function cargarSelectLocalesPendientes(){

    let options="";

    //Este for recorre la lista de reservas pendientes que tiene el usuario que se logueo y las agrega al select de reservas pendientes
    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        if(listaPersonas[posUsuarioLogueado].listaReservas[pos].estadoReserva=="pendiente"){//Se agregan al select las que tienen estado pendiente
            let reservaPendientesDelUsuarioLogueado=listaPersonas[posUsuarioLogueado].listaReservas[pos].localElegido;

            options+="<option value='"+reservaPendientesDelUsuarioLogueado+"'>"+reservaPendientesDelUsuarioLogueado+"</option>"
        }         
    }  

    document.querySelector("#sctLocalACancelar").innerHTML=options;
    
}


function cancelarReserva(){

    let reservaACancelar=document.querySelector("#sctLocalACancelar").value

    //este for recorre la lista de reservas que tiene el usuario logueado hasta encontrar la que coincide con
    //la que el usuario quiere cancelar. Cuando la encuentra le cambia el estado(atributo) a "cancelada"
    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        let reservaPendienteDelUsuarioLogueado=listaPersonas[posUsuarioLogueado].listaReservas[pos].localElegido;
            if(reservaACancelar==reservaPendienteDelUsuarioLogueado){

                //En este for se recorre la lista de locales hasta encontrar la que el usuario cancelo
                //cuando la encuentra le resta a su atributo "cuposOcupados" la cantidad que habia
                //reservado el usuario.
                for(let pos1=0;pos1<listaLocales.length;pos1++){
                    if(listaLocales[pos1].nombre==reservaACancelar && listaPersonas[posUsuarioLogueado].listaReservas[pos].estadoReserva=="pendiente"){

                        listaLocales[pos1].cuposOcupados=listaLocales[pos1].cuposOcupados-listaPersonas[posUsuarioLogueado].listaReservas[pos].cantidadReservada;

                        //Luego de la resta anterior se le cambia el estado a la reserva a "cancelada".
                        listaPersonas[posUsuarioLogueado].listaReservas[pos].estadoReserva="cancelada"
                    }
                }
            }
               

    }  

    document.querySelector("#msjCancelarReserva").innerHTML="Se ha cancelado la reserva"

    cargarSelectLocalesPendientes();//Vuelve a mostrar el select con las que siguen pendientes

}

// ------------------------ Calificar reserva -----------------------------

function mnuCalificarReserva(){
    ocultarFuncionPersona();
    document.querySelector("#mnuCalificarReserva").style.display="block";
    cargarSelectReservasFinalizadas();
}

function cargarSelectReservasFinalizadas(){

    let options="";

    //Este for recorre la lista de reservas finalizadas que tiene el usuario que se logueo y las agrega al select de reservas finalizadas
    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        let objReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos]
        if(objReserva.estadoReserva=="finalizada" && objReserva.noCalifico){//Se agregan al select las que tienen estado finalizada y que no han sido calificadas
            let reservaPendientesDelUsuarioLogueado=listaPersonas[posUsuarioLogueado].listaReservas[pos].localElegido;

            options+="<option value='"+reservaPendientesDelUsuarioLogueado+"'>"+reservaPendientesDelUsuarioLogueado+"</option>"
        }         
    }  

    document.querySelector("#sctLocalACalificar").innerHTML=options;

}

function calificarReservaFinalizada(){
    let unaCalificacion=Number(document.querySelector("#txtCalificacion").value);
    let localElegido=document.querySelector("#sctLocalACalificar").value;

    if(unaCalificacion>0 && unaCalificacion<=5){
        let posObjLocal = buscarLocal(localElegido);
        let objLocal=listaLocales[posObjLocal];

        objLocal.agregarCalificacion(unaCalificacion);
        document.querySelector("#msjAgregarCalificacion").innerHTML = "Calificacion agregada correctamente";
        document.querySelector("#txtCalificacion").value = "";

        //Luego de calificar se cambia la propiedad "noCalifico" de la reserva a false
        for(pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
            if(listaPersonas[posUsuarioLogueado].listaReservas[pos].localElegido==localElegido){
                listaPersonas[posUsuarioLogueado].listaReservas[pos].noCalifico=false;
            }
        }

        cargarSelectReservasFinalizadas();//Si logra calificar se vuelve a cargar el select

    }
    else{
        document.querySelector("#msjAgregarCalificacion").innerHTML = "Digitar una calificacion valida";
    }

}

function buscarLocal(localElegido){
    let resultado=-1

    for (let pos = 0; pos < listaLocales.length && resultado==-1  ; pos++) {
        let objLocal = listaLocales[pos];
            if(objLocal.nombre==localElegido){
                resultado=pos;
            }
    }
    return resultado
}

// ------------------------ Mostrar reservas pendientes -----------------------------


function mnuReservasPendientes(){
    ocultarFuncionPersona();

    let htmlReservasPendientes="";

    for (let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        let objReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos]

        if(objReserva.estadoReserva=="pendiente"){
            let posObjLocal=-1;

            //Con este for recorro la lista de locales y encuentro la posicion del Local el cual la persona tiene la reserva pendiente
            for(let pos1=0;pos1<listaLocales.length;pos1++){
                let objLocal=listaLocales[pos1]
                if(objLocal.nombre==objReserva.localElegido){
                    posObjLocal=pos1;
                }
            }

            htmlReservasPendientes += "<div>";
            htmlReservasPendientes += "<h2>"+ listaLocales[posObjLocal].nombre +"</h2>";
            htmlReservasPendientes +=  "<img src='"+listaLocales[posObjLocal].foto+"'>";
            htmlReservasPendientes += "<p>"+"Cantidad de cupos reservados: "+ objReserva.cantidadReservada +"</p>";
            htmlReservasPendientes += "</div>";   
            htmlReservasPendientes += "<hr>"

        }
    }

    document.querySelector("#lstReservasPendientes").innerHTML=htmlReservasPendientes;
    document.querySelector("#mnuReservasPendientes").style.display="block";

    if(htmlReservasPendientes==""){//Si no hay reservas pendientes mostrar un mensaje
    document.querySelector("#msjReservasPendientes").innerHTML="No hay reservas pendientes"
    }

}

// ------------------------ Info estadistica personas -----------------------------

function mnuInfoEstadisticaPersonas(){
    ocultarFuncionPersona();
    document.querySelector("#mnuInfoEstadisticaPersonas").style.display="block";
    let tablaHTML = "<table>"
    tablaHTML +="<tr><th>Reservas finalizadas</th><th>Cantidad de reservas finalizadas</th><th>Reservas totales del local</th><th>Q de reservas finalizadas del usuario/Reservas totales del local</th></tr>"

    let listaReservasFinalizadasUsuarioLogueado=[];//lista donde se van a guardar los nombres de los locales donde el usuario haya finalizado reservas
    let localesYaMostrados=[];//si se muestra un local en la tabla se guarda en esta lista para no repetirlos
    let cantidadlocalConMasReservas=0
    let nombreLocalConMasReservas=""
    //Se recorren las reservas del usuario logueado
    
    for(pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        let objReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos];
        listaReservasFinalizadasUsuarioLogueado.push(objReserva.localElegido);

        //Si la reserva esta finalizada se muestra lo siguiente
        if(objReserva.estadoReserva=="finalizada"){
            if(noSeMostro(localesYaMostrados,objReserva.localElegido)){
                tablaHTML +="<tr><td>"+objReserva.localElegido+"</td>";

                let qTotalReservas=qReservasTotalesUsuarioParaUnLocal(objReserva.localElegido)
                let qFinalizadas=qReservasFinalizadasUsuarioParaUnLocal(objReserva.localElegido)

                tablaHTML += "<td>"+qFinalizadas+"</td>"; //Aca se muestra la cantidad de reservas finalizadas con ese nombre que tiene el usuario


                let nombreLocal=objReserva.localElegido
                let cantidadReservadaTotal=cantidadReservada(nombreLocal)
                
                tablaHTML += "<td>"+cantidadReservadaTotal+"</td>";
                tablaHTML += "<td>"+(qFinalizadas/cantidadReservadaTotal)*100+"%"+"</td>";

                localesYaMostrados.push(objReserva.localElegido)//Como ya se mostro se agrega a la lista de mostrados

                if(cantidadlocalConMasReservas==qTotalReservas){
                    nombreLocalConMasReservas+=objReserva.localElegido+", ";
                }

                if(cantidadlocalConMasReservas<qTotalReservas){
                   cantidadlocalConMasReservas=qTotalReservas;
                   nombreLocalConMasReservas=objReserva.localElegido+", ";
                }

            }

        }

    }

    document.querySelector("#mayorQReservas").innerHTML="Local/es mas reservado/s: "+nombreLocalConMasReservas+" con "+cantidadlocalConMasReservas+" reservas";

    document.querySelector("#tablaReservas").innerHTML=tablaHTML;

}

function qReservasFinalizadasUsuarioParaUnLocal(nombreLocal){ //Esta funcion calcula la cantidad de reservas finalizadas con ese nombre que tiene el usuario
    let qFinalizadas=0
    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        objReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos]
        if(objReserva.localElegido==nombreLocal && objReserva.estadoReserva=="finalizada"){
            qFinalizadas++
        }
    }
    return qFinalizadas
}

function qReservasTotalesUsuarioParaUnLocal(nombreLocal){ //Esta funcion calcula la cantidad de reservas totales con ese nombre que tiene el usuario
    let qTotales=0
    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        objReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos]
        if(objReserva.localElegido==nombreLocal){
            qTotales++
        }
    }
    return qTotales
}


function noSeMostro(localesYaMostrados,nombreLocal){ //Esta funcion evita que un mismo local se muestre mas de una vez
    resultado=true
    for(let pos=0;pos<localesYaMostrados.length && resultado;pos++){
        if(nombreLocal==localesYaMostrados[pos]){
            resultado=false
        }
    }
    return resultado
}

function cantidadReservada(nombreLocal){
    //Esta funcion recorre todas las reservas que han hecho los usuarios y suma cada vez que encuentra una reserva con el nombre del local sin importar el estado
    let cantidadReservadaTotal=0;

    for(let pos=0;pos<listaPersonas.length;pos++){
        for(let pos1=0;pos1<listaPersonas[pos].listaReservas.length;pos1++){
            let objReserva=listaPersonas[pos].listaReservas[pos1]
            if(objReserva.localElegido==nombreLocal){
                cantidadReservadaTotal++
            }
        }
    }
    return cantidadReservadaTotal
}

function localConMasReservas(){

    let localMasReservado=""
    let mayorQDeReservas=0
    //Recorro la lista de reservas del usuario logueado
    for(let pos=0;pos<listaPersonas[posUsuarioLogueado].listaReservas.length;pos++){
        let objReserva=listaPersonas[posUsuarioLogueado].listaReservas[pos]

        //Si hay mas de un local que coincide en el maximo se muestran todos
        if(mayorQDeReservas==objReserva.cantidadReservada){
            localMasReservado+=objReserva.localElegido+", "
        }

        if(mayorQDeReservas<objReserva.cantidadReservada){
            mayorQDeReservas=objReserva.cantidadReservada
            localMasReservado=objReserva.localElegido+", "


        }


    }


}