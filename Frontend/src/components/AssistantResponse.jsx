function AssistantResponse({ assistantName, reply, t }) {
  if (!reply) return null;

  return (
    <div className="reply-box">
      <strong>{assistantName || t.assistantSays}</strong>
      <p style={{ margin: '5px 0 0', whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>{reply}</p>
    </div>
  );
}

export default AssistantResponse;
