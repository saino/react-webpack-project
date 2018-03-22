import React, {Component} from "react";
import { Icon, InputNumber  } from "antd"
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from "moment";

import { changeMaterial } from '../../../stores/reducers/work'

class EditArea extends Component{

    getCuurentmaterial() {
        const { work1 } = this.props;
        const { material } = work1;
        const currentMaterial = material.filter(materialItem => materialItem.active)[0];
        return currentMaterial;
    }
    render(){
        return <div className="edit-area">
            <div className="edit-title">功能栏</div>
            <div className="edit-content">
                {this.renderControlMaterial()}
            </div>
            <style>{`
                .edit-area{
                    height: 700px;
                    width: 240px;
                    background: rgba(38,66,70,1);
                }
                .edit-title{
                    height: 40px;
                    width: 240px;
                    background: rgba(58,104,108,1);
                    color: rgba(196,191,151,1);
                    font-size: 14px;
                    text-align: center;
                    line-height: 40px;
                }
                .audio-loop{
                    height: 55px;
                    color: #C4BF97;
                    font-size: 14px;
                    line-height: 55px;
                    padding-left: 16px;
                    display: flex;
                    border-bottom: solid 1px rgba(0,0,0,0.2);
                }
                .isloop{
                    height: 20px;
                    width: 20px;
                    margin-left: 16px;
                    background: #3A686C;
                    margin-top: 19px;
                    text-align: center;
                    line-height: 19px;
                    color: #fff;
                    cursor: pointer;
                }
                .time{
                    display: flex;
                    height: 26px;
                    margin-top: 16px;
                    color: #C4BF97;
                    padding-left: 16px;
                    font-size: 14px;
                    line-height: 26px;
                }
                .time-input{
                    height: 26px;
                    width: 136px;
                    background: #3A686C;
                    color: #fff;
                    margin-left: 16px;
                    padding: 6px 8px;
                    display: flex;
                    line-height: 10px;
                }
                .time1{
                    background: #3A686C;
                    color: #fff;
                    border: none;
                    margin-top: -6px;
                    height: 26px;
                    width: 16px;
                    margin-left: 8px;
                }
                .ant-input-number-handler-wrap{
                    display: none;
                }
                .ant-input-number-input-wrap{
                    background: #3A686C;
                }
                .ant-input-number-input{
                    background: #3A686C;
                    color: #fff;
                    padding: 0;
                }
                .ant-input-number:hover{
                    border: none;
                }
                .ant-input-number-focused{
                    -webkit-box-shadow: none;
                    box-shadow: none;
                    outline: none;
                    border:none;
                }
            `}</style>
        </div>
    }
    renderControlMaterial(){
        const currentMaterial = this.getCuurentmaterial();
        if (!currentMaterial || !currentMaterial.active){
            return null;
        }
        if (currentMaterial.type === "audio"){
            return this.audioControl();
        } else{
            return this.imageControl();
        }
    }
    audioControl() {
        const currentMaterial = this.getCuurentmaterial();
        // console.log(currentMaterial);
        if (!currentMaterial.timeStart){
            currentMaterial.timeStart = "00:00:00.00"
        }
        let endHour = moment.duration(currentMaterial.duration * 1000).hours();
        let endMinute = moment.duration(currentMaterial.duration * 1000).minutes();
        let endSecond = moment.duration(currentMaterial.duration * 1000).seconds();
        let endMillisecond = moment.duration(currentMaterial.duration * 1000).milliseconds();
        // console.log(hourEnd, minuteEnd, secondEnd, milliseconds);
        return (<div>
            <div className="audio-loop">
                循环播放 
                <div className="isloop" onClick={this.onChangeLoop}> 
                    {currentMaterial.loop ?  <Icon type="check" /> : null} 
                </div>
            </div>
            <div>
                <div className="time">开始时间 <div className="time-input">
                    <InputNumber className="time1 startHour" min="0" max={23} defaultValue="0"/>:
                    <InputNumber className="time1 startMinute" min="0" max="59" defaultValue="0"/>:
                    <InputNumber className="time1 startSecond" min="0" max="59" defaultValue="0"/>.
                    <InputNumber className="time1 startMillisecond" min="0" max="99" defaultValue="0"/>
                </div></div>
                <div className="time">结束时间 <div className="time-input">
                    <InputNumber className="time1 endHour" min="0" max={23} defaultValue={endHour}/>:
                    <InputNumber className="time1 endMinute" min="0" max="59" defaultValue={endMinute}/>:
                    <InputNumber className="time1 endSecond" min="0" max="59" defaultValue={endSecond}/>.
                    <InputNumber className="time1 endMillisecond" min="0" max="99" defaultValue={endMillisecond}/>
                </div></div>
            </div>
        </div>)
    }
    onChangeLoop = () => {
        const currentMaterial = this.getCuurentmaterial();
        currentMaterial.loop = !currentMaterial.loop;
        this.props.changeMaterial(currentMaterial);
    }
    imageControl() {

    }
}

const mapStateToProps = ({work1}) => {
    return {
        work1
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditArea);