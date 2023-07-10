import React, {ChangeEvent} from 'react';

type PropsType = {
    isDone: boolean
    callBack: (newIsDone: boolean) => void

}
export const Checkbox = (props: PropsType) => {
    const changeCheckBoxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input  type="checkbox" checked={props.isDone} onChange={changeCheckBoxStatusHandler}/>
    );
};

