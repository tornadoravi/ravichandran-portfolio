import React from 'react';
import { codPlatforms, codSyncStates, codExpiryStates } from './cod-platforms.js';

export default function CodPlatformStatus({ statuses, platforms = codPlatforms, removing = false, expiry = false, onConfirm, onFail, onRetry }) {
  return <ul className="cod-platform-list" aria-label="COD protection status">
    {platforms.map(platform => {
      const status = statuses[platform.id];
      const description = (expiry && codExpiryStates[status]) || codSyncStates[status];
      if (!description) throw new Error(`Unknown COD sync status for ${platform.id}: ${status}`);
      const pending = ['pending', 'removal-pending'].includes(status);
      const failed = ['failed', 'removal-failed'].includes(status);
      const ending = removing ? expiry ? ' expiry' : ' removal' : '';
      return <li key={platform.id} data-platform={platform.id} data-sync-status={status}>
        <div className="cod-platform-heading"><strong>{platform.name} COD protection</strong></div>
        <p className="cod-platform-state">{description[0]}</p>
        <p className="cod-platform-detail">{description[1]}</p>
        {onConfirm && <div className="cod-platform-actions">
          <button type="button" disabled={!pending} onClick={() => onConfirm(platform.id)}>Demo: acknowledge {platform.name}{ending}</button>
          {failed
            ? <button type="button" onClick={() => onRetry(platform.id)}>Demo: retry {platform.name}{ending}</button>
            : <button type="button" disabled={!pending} onClick={() => onFail(platform.id)}>Demo: fail {platform.name}{ending}</button>}
        </div>}
      </li>;
    })}
  </ul>;
}
