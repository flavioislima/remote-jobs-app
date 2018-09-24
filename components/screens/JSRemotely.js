import React from 'react'
import ListJobs from '../ListJobs'

const url = 'https://jsremotely.com/api'

const JSRemotely = () => (
    <ListJobs
        url={url}
        source={"JSRemotely"}
    />
)

export default JSRemotely