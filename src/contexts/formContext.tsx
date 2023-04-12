//Context (contexto - caixa que armazena os dados), Recuducer(serve para executar ações específicas), Provider (Ambiente que armazena os dados do contexto), Hook (simplica o processo de acesso as informações das páginas)

import { Children, createContext, useContext,useReducer, ReactNode } from "react";

type State = {
    currentStep: number;
    name: string;
    level: 0 | 1;
    email: string;
    github: string;
}

type Action = {
    type: FormActions;
    payload: any;
};

type ContextType = {
    state: State;
    dispatch: (action: Action) => void;
}

type FormProviderProps = {
    children: ReactNode
};


const initialData: State = {
    currentStep: 0,
    name: '',
    level: 0,
    email: '',
    github: ''
}


//Context

const FormContext = createContext < ContextType | undefined >(undefined);

// Reducer

export enum FormActions {

    setCurrentStep,
    setName,
    setLevel,
    setEmail,
    setGithub
}

export const FormReducer = (state:State, action:Action) => {

    switch(action.type) {

        case FormActions.setCurrentStep:

            return {...state, currentStep:action.payload};

            case FormActions.setName:

                return {...state, name: action.payload};

            case FormActions.setLevel:

                return {...state, level: action.payload};

            case FormActions.setEmail:

                return {...state, email: action.payload};

            case FormActions.setGithub:

                return {...state, github: action.payload};

            default: // se foi enviado um action (ação que não existe), não trocamos nada e retorna o state padrão

                return state;
    
    }

}

//Provider

export const FormProvider = ({children}: FormProviderProps) => {

    const [state, dispatch] = useReducer(FormReducer, initialData);

    const value = { state, dispatch };

    return(

        <FormContext.Provider value={value}>

            {children}

        </FormContext.Provider>
    );  

}

// Context Hook

export const useForm = () => {

    const context = useContext(FormContext);

    if(context === undefined) {

        throw new Error('useForm precisa ser usado dentro do FormProvider')
    }

    return context;
}

    

