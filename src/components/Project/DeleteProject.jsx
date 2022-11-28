import React from "react";
import { useMutation, gql } from '@apollo/client';
import { InputField, InputFieldWithLabelAndSubtitle } from "../Input";

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
            <button type="submit" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" >
                Delete Project by ID
            </button>
        </form>
    );
}

export default DeleteProject;