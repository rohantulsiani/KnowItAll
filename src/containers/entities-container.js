import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'
import {GetEntitiesFromFirebase} from '../reducers/entities-reducer'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import EntityCard from '../components/entity-components/entity-card'
import CreateEntityModal from '../components/create-entity-modal'
import { getEntities, addEntity, getUserData } from '../firebase'
import { dispatchGetEntities } from '../reducers/entities-reducer'
import { dispatchAttemptLogin } from '../reducers/login-reducer'
import { dispatchAuthDone } from '../reducers/on-auth-reducer'

class Entities extends Component {
  constructor(props) {
    super(props);
    getEntities(this.props.dispatchGetEntities)

    if(!this.props.authDone)
    {
      getUserData(this.props.dispatchAttemptLogin)
      this.props.dispatchAuthDone()
    }  
  }
  render() {
  	return (
  		<div className="row">
      		<h1 style={{marginTop:'15px', textAlign: "center"}} className="col-sm-12">Entities</h1>
      		<div style={{margin: "auto"}} className="col-sm-12">
      			<div className="row">
  	    		    <div className="col-sm-4"></div>
  	    			<CreateEntityModal />
  	    			<div className="col-sm-4"></div>
      			</div>
      		</div>
          <div style={{marginTop:"20px"}}className="row">
            {
              (this.props.entities) ? (
                Object.keys(this.props.entities).map((key) => {
                  return (
                    <EntityCard key={key} entity={this.props.entities[key]} />
                  )
                })
              ) : (
                <div></div>
              )
            }
          </div>
      	</div>
  	)
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities,
    authDone: state.authDone
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators( { dispatchAuthDone, dispatchGetEntities, dispatchAttemptLogin }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Entities);