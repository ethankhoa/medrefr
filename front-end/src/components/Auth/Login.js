import React, { Component, PropTypes as T } from 'react'
import JSONDebugger from './../../utils/JSONDebugger'

import DebugTempLink from '../../utils/DebugTempLink'
import RaisedButton from 'material-ui/RaisedButton'

//axios
// import { signIn } from './../../utils/axiosHelper'
import { signIn, isAuthenticated } from './../../api/Auth'
import { removeToken, readToken } from './../../api/jwt'

import Formsy from 'formsy-react'
import { FormsyText } from 'formsy-material-ui/lib'

import { Redirect } from 'react-router'

//Material UI theme
import { MuiThemeProvider,
         getMuiTheme } from 'material-ui/styles'

import medrefrTheme from './../styles/Theme'

const style = {
    referralOptions :{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    uploadButton :{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card :{
        marginBottom : 15
    },
    cardActions :{
        textAlign: 'right'
    },
    paperStyle: {
    //   width: 300,
      margin: 'auto',
      padding: 20,
    },
    switchStyle: {
      marginBottom: 16,
    },
    submitStyle: {
      marginTop: 32,
    },
    chip: {
        margin: 4,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
  },
}

const errorMessages = {
    wordsError: "Please only use letters",
    numericError: "Please provide a number",
    urlError: "Please provide a valid URL",
}

class Login extends Component {
    constructor(props) {
      super(props)
      this.enableButton = this.enableButton.bind(this)
      this.disableButton = this.disableButton.bind(this)
      this.submitForm = this.submitForm.bind(this)
      this.notifyFormError = this.notifyFormError.bind(this)
      this.signOut = this.signOut.bind(this)

      this.state = {
          canSubmit: true,
          debugjSON: null,
          isAuthenticated: false,
          token: null
      }   
      
    }



    disableButton = () => {
    this.setState({canSubmit: false})
    }

    enableButton = () => {
    this.setState({canSubmit: true})
    }

    submitForm = (data) => {
        // alert(JSON.stringify(data,null,4))
        this.setState( { debugjSON: data })
        const reqBody = (data)
        // console.log('login form body', reqBody)
        signIn(reqBody)
        this.setState( { token: readToken() })
    }

    notifyFormError = (data) => {
    console.error('Form error:', data)
    }

    signOut() {
        removeToken()
        this.setState( { token: null })
    }


    render(){
        
        return(
            <MuiThemeProvider muiTheme={medrefrTheme}>
            <div className="generic-center"> 
                <DebugTempLink />
                {/* temp onscreen redirection */}
                <h1>This is a Login page</h1>
                <Formsy.Form
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={this.submitForm}
                    onInvalidSubmit={this.notifyFormError}
                >

                <FormsyText
                            name="email"
                            required
                            hintText="email"
                            floatingLabelText="Email"
                />
                <br />
                <FormsyText
                            name="password"
                            type="password"
                            required
                            hintText="password"
                            floatingLabelText="password"
                />
                <br />

                <RaisedButton
                    style={style.submitStyle}
                    type="submit"
                    label="Submit"
                    disabled={!this.state.canSubmit}
                />

                </Formsy.Form>


                <JSONDebugger json={this.state.debugjSON} />

                <RaisedButton
                style={style.submitStyle}
                label="DELETE TOKEN aka LOGOUT"
                onClick={this.signOut}
                />

                <br />
                <h2>token = {this.state.token}</h2>

                <RaisedButton
                style={style.submitStyle}
                label="isAuthenticated"
                onClick={this.signOut}
                />
                <h2>isAuthenticated ? {this.state.isAuthenticated.toString()}</h2>
            </div>
            </MuiThemeProvider>

        )
    }
}

export default Login