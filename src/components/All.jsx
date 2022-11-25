import React from "react";
import { useQuery, gql } from '@apollo/client';

// fetch all available graphql
const GET_PROJECT = gql`query project { project { Data { ID name description user_id } } }`;
const GET_ACTIVITY = gql`query activity { activity { Data { ID name description user_id } } }`;
const GET_DAILY_REPORT = gql`query dailyreport { dailyreport { Data { ID name description user_id } } }`;
