import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {registerUser, getUserData, logout, login} from '../firebase'
import {dispatchAttemptLogin} from '../reducers/login-reducer'
import { dispatchAuthDone } from '../reducers/on-auth-reducer'

class Login extends Component {
  constructor(props) {
    super(props);  
    this.state = {error: false, email:"", password:""}
    
    if(!this.props.authDone)
    {
    	getUserData(this.props.dispatchAttemptLogin)
    	this.props.dispatchAuthDone()
    }
  }

toggleError() {
  	this.setState({error:!this.state.error})
 }

  render() {
  	return (
		<div className="col-sm-12 container">
    		<h1 style={{marginTop:'15px', textAlign: "center"}} className="col-sm-12">Login</h1>
    		<img className="col-sm-12" style={{display: "block", margin:"auto", marginTop: "20px", height:"5em", width:"7em"}}src="https://firebasestorage.googleapis.com/v0/b/knowitall-893d7.appspot.com/o/Logos%2Flogosm.png?alt=media&token=4d0c7eba-02a5-42b4-919d-78e261040c47" />
    		<div className="form-group col-sm-12">
	    		<div className="col-sm-12">
	    			<label style={{marginTop:"20px", textAlign:'center'}} className="col-sm-12" htmlFor="email">Email</label>
					<input onChange={(event)=>{this.setState({email: event.target.value})}} style={{display:"block", margin: "auto", marginBottom:"15px", color: "black"}} type="text" className="col-sm-5 form-control" placeholder="Email" />
					<label style={{textAlign:'center'}} className="col-sm-12" htmlFor="password">Password</label>
					<input onChange={(event)=>{this.setState({password: event.target.value})}} style={{display:"block", margin: "auto", color: "black"}} type="password" className="col-sm-5 form-control" placeholder="Password" />
					
					<div className="col-sm-12">
						<button onClick={()=>{registerUser(this.state.email.trim(), this.state.password.trim(), this)}}style={{display:"block", margin:"auto", marginTop: "15px"}} className="col-sm-2 btn btn-success">Register</button>
						<button onClick={()=>{login(this.state.email.trim(), this.state.password.trim())}} style={{display:"block", margin:"auto", marginTop: "15px"}} className="col-sm-2 btn btn-danger">Login</button>
						<button onClick={logout}>Logout</button>
					</div>
					{this.state.error ? (<div style={{marginTop: "15px", textAlign:"center"}}className="col-sm-12">
						<span style={{color:"red"}}>Please Use A Valid USC Email</span>
					</div>):<div></div>}
	    		</div>
	    	</div>
    	</div>
  	)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { dispatchAttemptLogin, dispatchAuthDone }, dispatch);
}

function mapStateToProps(state) {
  return {
    authDone: state.authDone
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);