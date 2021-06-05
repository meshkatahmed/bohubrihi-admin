import React, {useEffect} from 'react';
import Header from '../header/Header';
import Home from './home/Home';
import Auth from '../auth/Auth';
import Recover from '../auth/Recover';
import {authCheck} from '../../redux/authActionCreators';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

const mapStateToProps=state=>({
    token: state.auth.token
});

const mapDispatchToProps=dispatch=>({
    authCheck: ()=>dispatch(authCheck())
});

const Body = props => {
    const token = props.token;
    useEffect(()=>{if(!token){props.authCheck()}});

    let renderable = (<Switch>
        <Route path='/admin/login' component={Auth}/>
        <Route path='/admin/recover' component={Recover}/>
        <Redirect to='/admin/login' />
    </Switch>)
    if(token){
        renderable=(<>
            <Header/>
            <Switch>
                <Route path='/admin/home' component={Home}/>
                <Redirect to='/admin/home'/>
            </Switch>
        </>)
    }
    return <>{renderable}</>
}
export default connect(mapStateToProps, mapDispatchToProps)(Body);