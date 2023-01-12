import React from "react";
import { useMutation, gql } from '@apollo/client';
import { InputField, InputFieldWithLabelAndSubtitle } from "../../Input/Input";
import { SubmitButton } from "../../Button";

const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
const DELETE_PROJECT = gql`
    mutation deleteProject ($id: String!) {
    deleteProject(id: $id)
    }
`;

const DeleteProject = () => {
    const [id, setId] = React.useState('');
    const [deleteProject, { loading, error }] = useMutation(DELETE_PROJECT, {
        refetchQueries: [
            { query: GET_PROJECT }
        ]
    });

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <form onSubmit={e => {
            e.preventDefault();
            deleteProject({ variables: { id } });
            setId('');
        }}>
            <InputFieldWithLabelAndSubtitle label={"ID"} subtitle={"ID of the Project"} value={id} placeholder="ID" onChange={e => setId(e.target.value)} />
            <SubmitButton label="Delete Project"/>
        </form>
    );
}

export default DeleteProject;