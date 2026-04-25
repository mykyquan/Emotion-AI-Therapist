function HistoryPanel({ history, onClearHistory, t }) {
  return (
    <div style={{ marginTop: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3>{t.journey}</h3>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            style={{ background: '#ff4444', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}
            type="button"
          >
            🗑️ {t.clearHistory}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <p style={{ color: 'var(--muted-color)' }}>{t.noRecords}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.map((item, idx) => (
            <div key={idx} style={{ padding: '15px', background: 'var(--panel-bg)', border: '1px solid var(--border-color)', borderRadius: '8px', boxShadow: '0 2px 4px var(--shadow-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '1.1em' }}>{item.context}</strong>
                <small style={{ color: 'var(--muted-color)' }}>{new Date(item.timestamp).toLocaleString()}</small>
              </div>
              {item.message && <p style={{ margin: '5px 0 0', color: 'var(--muted-color)' }}>"{item.message}"</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HistoryPanel;
