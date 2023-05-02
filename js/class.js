


let ultimoIdLocal = 0;
class local{
    constructor(pNombre,pUsuario,pContraseña,pTipoLocal,pDireccion,pCupoMaximo,pFoto,pEstado,pCuposOcupados){
        ultimoIdLocal++;
        this.id=ultimoIdLocal;
        this.nombre=pNombre;
        this.usuario=pUsuario;
        this.contraseña=pContraseña;
        this.tipoLocal=pTipoLocal;
        this.direccion=pDireccion;
        this.cupoMaximo=pCupoMaximo;
        this.foto=pFoto;
        this.estado=pEstado;
        this.cuposOcupados=pCuposOcupados;
        this.calificaciones = [];

    }

    agregarCalificacion(valor){
        this.calificaciones.push(valor);
    }


}

let ultimoIdPersona = 0;
class persona{
    constructor(pNombre,pUsuario,pContraseña){
        ultimoIdPersona++;
        this.id=ultimoIdPersona;
        this.nombre=pNombre;
        this.usuario=pUsuario;
        this.contraseña=pContraseña;
        this.listaReservas=[];
    }
}

class reserva{
    constructor(pLocalElegido,pCantidadReservada,pEstadoReserva){
        this.localElegido=pLocalElegido;
        this.cantidadReservada=pCantidadReservada;
        this.estadoReserva=pEstadoReserva;
        this.noCalifico=true;
    }
}