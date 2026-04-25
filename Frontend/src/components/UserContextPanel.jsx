import AssistantResponse from './AssistantResponse';

function UserContextPanel({
  assistantName,
  contextKey,
  contextKeys,
  loadingAI,
  message,
  onContextChange,
  onMessageChange,
  onSubmit,
  reply,
  t,
}) {
  return (
    <div className="context-card">
      <h3>{t.contextQuestion}</h3>
      <div className="context-options">
        {contextKeys.map(key => (
          <button
            className={contextKey === key ? 'context-button active' : 'context-button'}
            key={key}
            onClick={() => onContextChange(prev => prev === key ? '' : key)}
            type="button"
          >
            {t.contexts[key]}
          </button>
        ))}
      </div>

      <textarea
        className="message-input"
        placeholder={t.descriptionPlaceholder}
        value={message}
        onChange={event => onMessageChange(event.target.value)}
      />

      <button
        className="submit-button"
        disabled={loadingAI}
        onClick={onSubmit}
        type="button"
      >
        {loadingAI ? t.thinking : t.sendMessage}
      </button>

      {/* TODO: Developers, swap this response renderer for citations, tool output, charts, or custom cards. */}
      <AssistantResponse assistantName={assistantName} reply={reply} t={t} />
    </div>
  );
}

export default UserContextPanel;
