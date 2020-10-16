import React, { Component } from 'react'
import {connect} from "react-redux";
import { getPendingProjects } from '../../../../store/profile/profile.actions';
import "./Approve.scss";

class Approve extends Component<any, any> {
    
    componentDidMount() {
        this.props.onGetPendingProjects()
    }

    render() {
        return (
            <div className="Approve">
                <div className="ApproveHead">
                    <h3 style={{ color: "white" }}>Approve Projects</h3>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onGetPendingProjects: () => dispatch(getPendingProjects())
    }
}

export default connect(null, mapDispatchToProps)(Approve);



