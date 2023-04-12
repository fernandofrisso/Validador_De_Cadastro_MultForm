import * as C from "./style";

import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect } from "react";

import { Theme } from "../../components/theme";

import { useForm, FormActions} from "../../contexts/formContext";

export const FormStep1 = () => {

    const navigate = useNavigate();

    const { state, dispatch } = useForm();

    useEffect(() => {

        dispatch({

            type: FormActions.setCurrentStep,
            payload: 1

        });

    }, []);


    const handleNextStep = () => {

       if (state.name !== "") {

            navigate('/step2');

       }else {

        alert("Digite seu nome")

       }
        
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {

        dispatch({

            type: FormActions.setName,
            payload: e.target.value

        });
    }

    return (

        <Theme>

            <C.Container>

            <p>Passo {state.currentStep}/3</p>

                <h1>Vamos começar com seu nome</h1>

                <p>Preencha o campo abaixo com seu nome completo.</p>

                <hr/>

                <label>

                    Seu nome completo

                    <input

                        type="text"
                        autoFocus
                        value={state.name}
                        onChange={handleNameChange}

                    />

                </label>

                <button onClick={handleNextStep}>Próximo</button>

            </C.Container>

        </Theme>
      
    )

}