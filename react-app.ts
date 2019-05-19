import * as React from 'react'

class Message extends React.Component<MessageProps> {
  render() {
    return (
      <div>
        {`You got a new message from ${this.props.from}: ${this.props.body}`}
      </div>
    )
  }
}

interface MessageProps {
  body: string
  from: string
}

export default Message