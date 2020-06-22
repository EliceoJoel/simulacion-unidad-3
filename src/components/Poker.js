import React, { Component } from 'react'

class Poker extends Component {

  constructor(){
    super()
    this.state={
      muestra:[],
      muestramul:[],
      n:0,
      dato:"",
      datoError:"",
      resultados:"",
      estadistico:"",
      estadisticoError:"",
      muestras:"",
      conclusion:'',
      Xo:"",
      alfa:'',
      alfaError:"",
      showAlfa:true,
      showDato:false
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
   this.setState({[e.target.name]:e.target.value})
   this.setState({
     datoError:"",
     alfaError:"",
     estadisticoError:"",
     conclusion:""
    })
  }

  cargarDatos(){
    if(this.state.dato !== ''){
      let array = this.state.muestra
      let arraymul = this.state.muestramul
      arraymul.push(this.state.dato.replace("0.",""))
      array.push(parseFloat(this.state.dato))
      let Fe = this.calcularFe()
      let Fo = this.calcularFo(arraymul)
      let Xo = this.calcularXo(Fe, Fo)
      this.setState({
        muestra:array, 
        muestramul:arraymul,
        dato:'',
        datoError:'',
        n: this.state.n+1,
        Xo: Xo,
        muestras:array.join(" - "),
        resultados:"n="+(this.state.n+1) + ", Xo="+Xo
      }) 
    }else{
      this.setState({datoError:"Introduzca un dato"})
    }
  }

  calcularXo(Fe, Fo){
    let res = 0
    for (let i = 0; i < 7; i++) {
      res = res + (Math.pow(Fe[i]-Fo[i],2))/Fe[i]  
    }
    return res
  }

  calcularFe(){
    let n = parseInt(this.state.n)+1
    let Fe = []
    Fe.push(n*0.30240)
    Fe.push(n*0.5040)
    Fe.push(n*0.1080)
    Fe.push(n*0.072)
    Fe.push(n*0.009)
    Fe.push(n*0.0045)
    Fe.push(n*0.0001)
    return Fe
  }

  calcularFo(muestra){
    let res = new Array (7)
    res.fill(0)
    for (let i=0 ; i<muestra.length ; i++){
      if(this.queEs(muestra[i]) === "TD"){
        res[0] = res[0]+1
      }
      if(this.queEs(muestra[i]) === "1P"){
        res[1] = res[1]+1
      }
      if(this.queEs(muestra[i]) === "2P"){
        res[2] = res[2]+1
      }
      if(this.queEs(muestra[i]) === "T"){
        res[3] = res[3]+1
      }
      if(this.queEs(muestra[i]) === "F"){
        res[4] = res[4]+1
      }
      if(this.queEs(muestra[i]) === "PK"){
        res[5] = res[5]+1
      }
      if(this.queEs(muestra[i]) === "TI"){
        res[6] = res[6]+1
      }
    }
    return res
  }

  queEs(numero){
    let res = ""
    let arrayDigitos = []
    numero.split('').forEach(x => arrayDigitos.push(x))
    let resultados = []
    while(arrayDigitos.length !== 0){
      let contadorIguales = 0
      let valor = arrayDigitos[0]
      for (let i = 0; i < arrayDigitos.length; i++) {
        if(valor === arrayDigitos[i]){
          contadorIguales++
          arrayDigitos.splice(i, 1)
          i--
        }
      }
      resultados.push(contadorIguales)
    }
    res = this.tipo(resultados)
    return res
  }

  tipo(array){
  let res = ''
  if(array.length === 5){res = "TD"}
  if(array.length ===4){res = "1P"}
  if(array.length ===3){
    if(array.indexOf(3) === -1){res = "2P"}
    else{res = "T"}
  }
  if(array.length ===2){
    if(array.indexOf(4) === -1){res = "F"}
    else{res = "PK"}
  }
  if(array.length ===1){res = "TI"} 
  return res
  }


  guardarEstaditico(){
    if(this.state.alfa!== ''){
      if(this.state.muestra.length !== 0){
        if(this.state.estadistico !== ''){
           if(parseFloat(this.state.Xo) < parseFloat(this.state.estadistico)){
              this.setState({conclusion:"Uniformidad"})
           }else{
            this.setState({conclusion:"No Uniformidad"})
           }
        }else{
          this.setState({estadisticoError:"Introduzca el estaditico teorico"})
        }
      }else{
        this.setState({datoError:"Introduzca un dato"})
      }
    }else{
      this.setState({alfaError:"Introduzca el dato alfa"})
    }
  }

  guardarAlfa(){
    if(this.state.alfa !== ''){
      this.setState({
        showAlfa:false, 
        showDato:true, 
        resultados:"alfa = " + this.state.alfa, 
      })
    }else{
      this.setState({
        alfaError:"Introduzca el dato alfa"
      })
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-12 text-center">
            <h3>
              Prueba de poker
            </h3>
          </div>
        </div>
        <div className="row mt-4">
          <form className="col-6">
          {this.state.showAlfa?
              <div className="form-group">
                <label htmlFor="dato">Primero guarde el porcentaje alfa (Ej: 5)</label>
                <input 
                  type="number" 
                  name="alfa"
                  className="form-control" 
                  placeholder="Introduce el porcentaje de alfa"
                  value={this.state.alfa}
                  onChange={this.onChange}
                  />
                  <p style={{color:"red"}}>{this.state.alfaError}</p>
                  <button type="button" className="btn btn-success" 
                    onClick={()=>this.guardarAlfa()}>
                    Guardar alfa
                  </button>
              </div>
            :null}
            {this.state.showDato?
              <div className="form-group">
                <label htmlFor="dato">Ahora cargue los datos de la muestra, estos deben ser de 5 decimales (Ej: 0.78656)</label>
                <input 
                  type="number" 
                  name="dato"
                  className="form-control" 
                  placeholder="Introduce un dato de la muestra"
                  value={this.state.dato}
                  onChange={this.onChange}
                  />
                  <p style={{color:"red"}}>{this.state.datoError}</p>
                  <button type="button" className="btn btn-success" onClick={()=>this.cargarDatos()}>Cargar</button>
              </div>
            :null}
          </form>
          <div className="col-6 border text-center">
            <label htmlFor="datos"><b>Muestra</b></label>
                <p className="mt-3">{this.state.muestras}</p>
          </div>
        </div>
        <div className="row border my-4">
          <div className="col-12 text-center">
            <label htmlFor="resultados"><b>Resultados</b></label>
            <div className="my-3">
              {this.state.resultados}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-6">
            <p>{"busca en la tabla Chi cuadrada: alfa="}<b>{parseInt(this.state.alfa)/100}</b>{" y k-1="}<b>{"6"}</b></p>
            <label htmlFor="estadistico">Introduzca el estadistico teorico</label>
            <input 
              type="number" 
              name="estadistico"
              className="form-control" 
              placeholder="Introduce un dato de la muestra"
              value={this.state.estadistico}
              onChange={this.onChange}
              />
              <p style={{color:"red"}}>{this.state.estadisticoError}</p>
              <button type="button" className="btn btn-success" onClick={()=>this.guardarEstaditico()}>Concluir</button>
          </div>
          <div className="col-6 border text-center">
            <label htmlFor="conclusion"><b>Conclusión</b></label>
            <p style={{color:"blue"}}><b>{this.state.conclusion}</b></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Poker