import PropTypes from 'prop-types'
import React, { useLayoutEffect, createRef } from 'react'

type Props = {
  ratio: number
}

const PlayerPlaceholder: React.FC<Props> = ({ ratio }) => {
  const nodeRef = createRef<HTMLDivElement>()

  useLayoutEffect(() => {
    // @TODO: handle resize
    // const width = $(nodeRef.current).width()
    // $(nodeRef.current).height(width * ratio)
  }, [nodeRef, ratio])

  return <div className="video-player-placeholder" ref={nodeRef} />
}

PlayerPlaceholder.propTypes = {
  ratio: PropTypes.number.isRequired,
}

export default React.memo(PlayerPlaceholder)
