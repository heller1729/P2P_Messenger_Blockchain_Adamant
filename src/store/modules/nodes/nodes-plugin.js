import apiClient from '../../../lib/P2P-api-client'

export default store => {
  // initial nodes state
  apiClient.getNodes().forEach(node => store.commit('nodes/status', node))

  apiClient.updateStatus()

  store.subscribe(mutation => {
    if (mutation.type === 'nodes/useFastest') {
      apiClient.useFastest = !!mutation.payload
    }

    if (mutation.type === 'nodes/toggle') {
      apiClient.toggleNode(mutation.payload.url, mutation.payload.active)
    }
  })

  apiClient.onStatusUpdate(status => {
    store.commit('nodes/status', status)
  })
}
