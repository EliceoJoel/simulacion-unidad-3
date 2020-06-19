import React, { Component } from 'react'

class KolmogorovSmirnov extends Component {

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
      estadisticoError:"",
      muestras:"",
      conclusion:'',
      Dmax:null,
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
      array.push(parseFloat(this.state.dato))
      //ordenamos de mayor a menor
      array.sort((a,b)=>a-b)
      let Dmax = this.calcularDmax(array)
      this.setState({
        muestra:array, 
        dato:'',
        datoError:'',
        n: this.state.n+1,
        muestras:array.join(" - "),
        Dmax: Dmax,
        resultados:"n="+(this.state.n+1) + ", alfa="+this.state.alfa + ", Dmax="+Dmax
      }) 
    }else{
      this.setState({datoError:"Introduzca un dato"})
    }
  }

  calcularDmax(muestra){
    console.log(this.state.muestra)
    let res = 0
    let Des = []
    let n = parseInt(this.state.n)+1
    for(let i = 0; i<muestra.length ; i++){
        console.log("n = "+(n))
        console.log((i+1)/(n))
        console.log(muestra[i])
        console.log("D="+ (i+1) +"/"+n+ " - " + muestra[i] )
        Des.push(((i+1)/n)-muestra[i])
    }
    console.log(Des)
    Des.sort((a,b)=>a-b)
    res = Des[Des.length-1]
    console.log("Dmax = "+res)
    return res
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

  guardarEstaditico(){
    if(this.state.alfa!== ''){
      if(this.state.muestra.length !== 0){
        if(this.state.estadistico !== ''){
           if(parseFloat(this.state.Dmax) < parseFloat(this.state.estadistico)){
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

  render() {
    return (
      <div className="container">
        <div className="row my-5">
          <div className="col-12 text-center">
            <h3>
              Prueba de la Kolmogorov Smirnov
            </h3>
          </div>
        </div>
        <div className="row mt-4">
          <form className="col-6">
            {this.state.showAlfa?
              <div className="form-group">
                <label htmlFor="dato">Primero guarde el dato alfa</label>
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
            <p>{"busca en la tabla K-S: alfa="}<b>{this.state.alfa}</b> {" y n="}<b>{this.state.n}</b></p>
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

export default KolmogorovSmirnov