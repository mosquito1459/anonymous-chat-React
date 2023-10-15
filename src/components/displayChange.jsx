import React,{ useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { UpdateUser } from '../store/UserStore';
import { toggleWindow } from "../store/WindowApp";

const DisplayChange = () => {
    
    const store         = useSelector((state) => state.User)
    const dispatch      = useDispatch()

    const [ display,setDisplay ]    = useState(null)
    const [ button,setButton]       = useState(false)

    const CloseDisplay = () => {
        dispatch(toggleWindow({Window: "DisplayChange" , data: false}))
    }

    const submitDisplay = (e) => {
        if(!display || display.length <= 3 || display.length >= 10) {
            return false
        }

        localStorage.setItem("userDisplay",display)
        dispatch(UpdateUser({userDisplay: display}))
        dispatch(toggleWindow({Window: "DisplayChange", data: false}))
        // console.log("eawr");
    }


    return (
        <div className="Window">
            <div className="application">

                { store.userDisplay &&
                    <div className="close" onClick={() => CloseDisplay()}>
                        <i className="fa-solid fa-xmark"></i>
                    </div>
                }

                <div className="header">
                    Display Name
                </div>
                <div className="input">
                    <input type="text" placeholder="พิมพ์ตรงนี้" onChange={(e) => {
                        setDisplay(e.target.value)
                        if(e.target.value.length <= 3 || e.target.value.length >= 10) {
                            setButton(false)
                        }else{
                            setButton(true)
                        }
                        }} />
                </div>
                <div className="item-center">
                    <button className={`btn-submit ${ !button && "disabled"}`} onClick={(e) => submitDisplay(e)}>
                        <i className="fa-solid fa-floppy-disk"></i> บันทึก
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DisplayChange;