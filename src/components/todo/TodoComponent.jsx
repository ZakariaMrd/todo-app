import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "./security/AuthContext";
import {retrieveTodoApi,updateTodoApi,createTodoApi} from "./api/TodoApiService";
import { Formik,Form, Field, ErrorMessage } from "formik";
import moment from "moment/moment";

export default function TodoComponent(){
    const {id} = useParams()
    const [description,setDescription] = useState('')
    const [targetDate,setTargetDate] = useState('')
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    useEffect(
        () => retrieveTodos()
        ,[id]
    )
    function retrieveTodos(){
        if(id!=-1){
        retrieveTodoApi(username,id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
    }
}
    function onSubmit(value){
        const todo = {
            id:id,
            username:username,
            description:value.description,
            targetDate:value.targetDate,
            done:false
        }
        if(id == -1){
                        createTodoApi(username,todo)
                            .then(response => {
                                navigate('/todos')
                            })
                            .catch(error => console.log(error))}
                else{
                      updateTodoApi(username,id,todo)
                            .then(response => {
                                navigate('/todos')
                            })
                            .catch(error => console.log(error))
    }
}
    
    function validate(values){
        let errors = {}
        if(!values.description){
            errors.description = 'Enter a Description'
        }else if(values.description.length<5){
            errors.description = 'Enter atleast 5 characters in Description'
        }
        if(values.targetDate == null || values.targetDate =='' || !moment(values.targetDate).isValid()){
            errors.targetDate = 'Enter a Target Date'
        }
        return errors
    
    }

    return (
        <div className="container">
            <h1>Enter Todo Details</h1>
            <div>
                <Formik initialValues={{description,targetDate}}
                    onSubmit={onSubmit}
                    validate={validate}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                    <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Description</label>
                                        <Field className="form-control" type="text" name="description"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Target Date</label>
                                        <Field className="form-control" type="date" name="targetDate"/>
                                    </fieldset>
                                    <button className="btn btn-success m-5" type="submit">Save</button>
                                </Form>
                            )
                        }
                </Formik>
            </div>
        </div>
    )
}