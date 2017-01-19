import React, { Component } from 'react';
import './../../css/style.css'
import axios from 'axios'

import { CreateReferral,
         GetAllReferral } from './../../api/ReferralDB'

//App components
import sampleReferrals from './_sample-referrals.js'
import Header from '../shared/Header'
import DebugTempLink from '../../utils/DebugTempLink'
import PageTab from './PageTab'

//theme related material-ui
import { MuiThemeProvider } from 'material-ui/styles'

import medrefrTheme from './../styles/Theme'         

class App extends Component {
  constructor() {
    super()
    this._loadSampleReferral = this._loadSampleReferral.bind(this)
    this._handleTabChange = this._handleTabChange.bind(this)
    this._addReferral = this._addReferral.bind(this)
    this._updateReferral = this._updateReferral.bind(this)

    this.state = {
      referrals: {},
      value: 'a',
    }
  }

  componentWillMount(){
    // commented off temporarily
    // let AllReferrals = GetAllReferral()

    //// Commented Code below works if its inside App.js
    console.log('getting referral from backend')
    const getAllReferralLink = REACT_APP_API_URL + '/referral/all'

    axios.get(getAllReferralLink)
    .then( allReferrals => {
        // console.log('type of : ', typeof allReferrals.data)
        let AllReferrals = allReferrals.data
        console.log(AllReferrals)
        this.setState( { referrals: AllReferrals.referrals || {} })

    })
    .catch( (error) => {
      error.response ? console.log(error.response.data) : console.log('Error', error.message)
    })


  }

  _addReferral(referral) {
    //update referral state 
    const referrals = {...this.state.referrals}
    // console.log('addreferral',referral)

    //add in new referral
    const timestamp = Date.now()
    referrals[`referral-${timestamp}`] = referral

    //set state
    this.setState( { referrals } )

    //send to db
    CreateReferral(referral)
    

  }

    _updateReferral(key, referral) {
    //update referral state 
    const referrals = {...this.state.referrals}
    // console.log(key)
    // console.log(this.state.referrals)
    // console.log(JSON.stringify(referral,null,2))

    referrals[key] = referral

    // //set state
    this.setState( { referrals } )

  }

  _loadSampleReferral() {
    this.setState({ referrals: sampleReferrals })
}
  _handleTabChange = (value) => {
    this.setState({
      value: value
    })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={medrefrTheme}>
        <div>
            {/* temp onscreen redirection */}
            <DebugTempLink />
            <Header />

            {/* temp temp load static data button */}
            <button onClick={this._loadSampleReferral}>{this.state.loadReferralsToggle ? 'Clear data' : 'Load data'}</button>

            <PageTab 
              referrals={this.state.referrals}
              _addReferral={this._addReferral}
              _updateReferral={this._updateReferral}
            />
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App;
