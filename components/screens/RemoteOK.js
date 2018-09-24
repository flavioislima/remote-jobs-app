import React from 'react'
import ListJobs from '../ListJobs'

const url = 'https://remoteok.io/api'

const RemoteOk = () => (
    <ListJobs url={url}
        source={"RemoteOk"}
    />
)

export default RemoteOk