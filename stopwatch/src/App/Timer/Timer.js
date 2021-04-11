import {interval} from 'rxjs';
import React from "react";
import Button from "./Button/Button";

export default class Timer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0,
            started: false,
            lastWaitClick: null,
            interval: interval(1000).subscribe(() => {
                this.AddSecond();
            }),
        }

        this.StartTimer = this.StartTimer.bind(this);
        this.StopTimer = this.StopTimer.bind(this);
        this.WaitTimer = this.WaitTimer.bind(this);
        this.ResetTimer = this.ResetTimer.bind(this);

    }

    AddSecond() {
        if (this.state.started) {
            this.setState(
                {
                    seconds: this.state.seconds + 1
                }
            )
        }
    }

    StopTimer() {
        this.setState({
            started: false,
            seconds: 0
        })
    }

    StartTimer() {
        this.setState({
            started: true
        })
    }

    WaitTimer() {
        const time = Date.now();
        const difference = time - this.state.lastWaitClick;
        if (this.state.lastWaitClick && difference < 300) {
            this.setState({
                started: false
            })
        } else {
            this.setState({
                lastWaitClick: time
            })
        }
    }

    ResetTimer() {
        this.setState({
            seconds: 0
        })
    }

    ConvertTime (secs) {
        let minutes = Math.floor(secs / 60);
        secs = secs%60;
        let hours = Math.floor(minutes/60)
        minutes = minutes%60;
        return ("0"+hours).slice(-2)+":"+("0"+minutes).slice(-2)+":"+("0"+secs).slice(-2);
    }


    render() {
        return (
            <div className="stopwatch-div">
                <p>{this.ConvertTime(this.state.seconds)}</p>
                <Button callback={this.StartTimer} name="Start"/>
                <Button callback={this.StopTimer} name="Stop"/>
                <Button callback={this.WaitTimer} name="Wait"/>
                <Button callback={this.ResetTimer} name="Reset"/>
            </div>
        );
    }


}