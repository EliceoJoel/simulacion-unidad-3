import React, { Component } from 'react'

class Frecuencia extends Component {

  constructor(){
    super()
    this.state={
      muestra:[],
      n:0,
      dato:"",
      datoError:"",
      alfa:"",
      alfaError:"",
      resultados:"",
      estadistico:"",
      k:"", 
      kError:"",
      Xo:"",
      estadisticoError:"",
      muestras:"",
      conclusion:'',
      showAlfa:true,
      showk:false,
      showDato:false,
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
   this.setState({[e.target.name]:e.target.value})
   this.setState({
     datoError:"",
     alfaError:"",
     kError:"",
     estadisticoError:"",
     conclusion:""
    })
  }

  cargarDatos(){
    if(this.state.dato !== ''){
      let array = this.state.muestra
      array.push(parseFloat(this.state.dato))
      let Xo = this.calcularXo(array)
      this.setState({
        muestra:array, 
        dato:'',
        datoError:'',
        n: this.state.n+1,
        muestras:array.join(" - "),
        Xo:Xo,
        resultados:"n="+(this.state.n+1) + ", alfa="+this.state.alfa + ", k="+ this.state.k + ", Estadistico Xo=" + Xo
      }) 
    }else{
      this.setState({datoError:"Introduzca un dato"})
    }
  }

  calcularXo(muestra){
    let res = 0
    let n = parseInt(this.state.n)+1
    let k = parseInt(this.state.k)
    let Fe = n/k
    let Fo = this.calcularFo(muestra,k)
    for(let i=0; i<k; i++){
      res = res + (Math.pow((Fe-Fo[i]),2))/Fe
    }
    return res
  }

  calcularFo(muestra,k){
    let res = new Array(k)
    res.fill(0)
    for(let i=0; i<muestra.length; i++){
      let rangoInferior = 0
      let rangoSuperior = 1/k
      for(let j=0; j<k; j++){
        if(muestra[i] >= rangoInferior && muestra[i] < rangoSuperior){
          res[j]=res[j]+1
        }
        rangoInferior = rangoSuperior
        rangoSuperior = rangoSuperior + 1/k
      }
    }
    return res
  }

  guardarAlfa(){
    if(this.state.alfa !== ''){
      this.setState({
        showAlfa:false, 
        showk:true, 
        resultados:"alfa=" + this.state.alfa, 
      })
    }else{
      this.setState({
        alfaError:"Introduzca el dato alfa"
      })
    }
  }

  guardark(){
    if(this.state.k !== ''){
      this.setState({
        showk:false,
        showDato:true,
        resultados:"alfa="+ this.state.alfa + ", k="+ this.state.k
      })
    }
  }



  guardarEstaditico(){
    if(this.state.alfa!== ''){
      if(this.state.k !== ''){
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
        this.setState({kError:"Introduzca el dato k"})
      }
    }else{
      this.setState({alfaError:"Introduzca el dato alfa"})
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-12 text-center">
            <h3>
              Prueba de la Frecuencia
            </h3>
          </div>
        </div>
        <div className="row mt-4">
          <form className="col-6">
            {this.state.showAlfa?
              <div className="form-group">
                <label htmlFor="alfa">Primero guarde el dato alfa</label>
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
            {this.state.showk?
              <div className="form-group">
                <label htmlFor="k">Ahora guarde el dato k</label>
                <input 
                  type="number" 
                  name="k"
                  className="form-control" 
                  placeholder="Introduce el dato k"
                  value={this.state.k}
                  onChange={this.onChange}
                  />
                  <p style={{color:"red"}}>{this.state.kError}</p>
                  <button type="button" className="btn btn-success" 
                    onClick={()=>this.guardark()}>
                    Guardar k
                  </button>
              </div>
            :null}
            {this.state.showDato?
              <div className="form-group">
                <label htmlFor="dato">Ahora cargue los datos de la muestra</label>
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
            <p>{"busca en la tabla Chi Cuadrada: grados de libertad = "}<b>{parseInt(this.state.k)-1}</b>{" y alfa = "}<b>{parseInt(this.state.alfa)/100}</b></p>
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

export default Frecuencia