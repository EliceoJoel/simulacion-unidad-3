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
      normal:"",
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
      this.setState({
        muestra:array, 
        muestramul:arraymul,
        dato:'',
        datoError:'',
        n: this.state.n+1,
        muestras:array.join(" - "),
        resultados:"n="+(this.state.n+1)
      }) 
    }else{
      this.setState({datoError:"Introduzca un dato"})
    }
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
    console.log(muestra)
    let res = new Array (7)
    res.fill(0)
    for (let i=0 ; i<muestra.length ; i++){
      if(this.isTD(muestra[i])){
        res[0] = res[0]+1
      }
      if(this.is1P(muestra[i])){
        res[1] = res[1]+1
      }
      if(this.is2P(muestra[i])){
        res[2] = res[2]+1
      }
      if(this.isT(muestra[i])){
        res[3] = res[3]+1
      }
      if(this.isF(muestra[i])){
        res[4] = res[4]+1
      }
      if(this.isPK(muestra[i])){
        res[5] = res[5]+1
      }
      if(this.isTI(muestra[i])){
        res[6] = res[6]+1
      }
    }
    return res
  }

  isTD(numero){
    let res = false
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
      console.log(resultados)
    }
    return res
  }

  is1P(numero){
    let res = false
    return res
  }

  is2P(numero){
    let res = false
    return res
  }

  isT(numero){
    let res = false
    return res
  }

  isF(numero){
    let res = false
    return res
  }

  isPK(){
    let res = false
    return res
  }

  isTI(numero){
    let res = false
    return res
  }



  guardarEstaditico(){
    if(this.state.muestra.length !== 0){
      if(this.state.estadistico !== ''){
         if(parseFloat(this.state.Zo) < parseFloat(this.state.estadistico)){
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
            <div className="form-group">
              <label htmlFor="dato">Cargue los datos de la muestra (deben ser de cinco decimales Ej: 0.21324) evite colocar 0.00000</label>
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
            <p>{"busca en la tabla normal: "}<b>{this.state.normal}</b></p>
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