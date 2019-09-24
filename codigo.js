/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", function () {

    var listaElementos = document.getElementById("listaPersona");
    document.getElementById("AddViajero").addEventListener("click", function () {
        var nuevoElemento = listaElementos.getElementsByTagName("li")[0].cloneNode(true);
        var botonEliminar = document.createElement("input");
        botonEliminar.setAttribute("class", "btn btn-primary btn-sm");
        botonEliminar.setAttribute("type", "button");
        botonEliminar.setAttribute("value", "Eliminar");
        botonEliminar.addEventListener("click", function () {
            listaElementos.removeChild(nuevoElemento);
        });

        nuevoElemento.appendChild(botonEliminar);
        listaElementos.appendChild(nuevoElemento);
});
    document.getElementById("botonCalculadora").addEventListener("click", function(){
        
        
        var salidaElemento = document.getElementById("salida");
        var resultado = [];
        var elementoPersona = listaElementos.getElementsByTagName("li");
        var totalEdad=0;
        var ahora = new Date();
        
        for (i=0; i<elementoPersona.length; i++){
            var inputElementos= elementoPersona[i].getElementsByTagName("input");
            var persona= new Persona();
            for (j=0; j<inputElementos.length;j++){
                if(inputElementos[j].name ==="nombre"){
                    persona.nombre=inputElementos[j].value;
                }
                if(inputElementos[j].name ==="edad"){
                    persona.edad= parseInt(inputElementos[j].value);
                    totalEdad+= persona.edad;
                }
            }
            resultado.push(persona);
            
        }
        var totalViaje= parseFloat(document.getElementById("totalCobrar").value);
        var porcentaje= parseInt(document.getElementById("viaje").value);
        var totalFactura= totalViaje+(totalViaje*(porcentaje/100));
        var pagoParcial= totalFactura/totalEdad;
        for (i=0; i<resultado.length;i++){
            resultado[i].factura= pagoParcial*resultado[i].edad;
            var personaJSON= JSON.stringify(resultado[i]);
            console.log(personaJSON);
            var persona=JSON.parse(personaJSON);
            persona.toString=function(){return this.nombre;};
            console.log(persona.toString());
        }

        salidaElemento.innerHTML = resultado.join("<br/>");
    });

});

function Persona() {
    this.nombre = "";
    this.edad = 1;
    this.factura = 0;

}


Persona.prototype.toString = function () {
    var facturaCadena = this.factura.toLocaleString("es-ES",{style:"currency", currency:"EUR", maximumFractionDigits:2});
    return this.nombre + "[" + this.edad + " ] paga " + facturaCadena;
};





