import {
  FaGripVertical,
  FaDownload,
  FaPencilAlt,
  FaTrashAlt
} from 'react-icons/fa';
import classNames from 'classnames';
import { forwardRef, useState } from 'react';

export const AssetRow = forwardRef((props, ref) => {
  const [isEnabled, setIsEnabled] = useState(props.isEnabled);
  const [isDisabled, setIsDisabled] = useState(false);

  const toggleIsEnabled = async () => {
    const newValue = isEnabled ? 0 : 1;
    setIsDisabled(true);

    try {
      const response = await fetch(`/api/v2/assets/${props.assetId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_enabled: newValue })
      });

      if (!response.ok) {
        throw new Error('Failed to update asset');
      }

      setIsEnabled(newValue);
      if (props.onToggle) {
        props.onToggle();
      }
    } catch (error) {
      console.error('Failed to toggle asset:', error);
      setIsEnabled(isEnabled);
    } finally {
      setIsDisabled(false);
    }
  };

  return (
    <tr ref={ref} style={props.style} className={classNames({ warning: isDisabled })}>
      <td className={classNames('asset_row_name')}>
        <span
          {...props.dragHandleProps}
          style={{
            cursor: props.isDragging ? 'grabbing' : 'grab',
            display: 'inline-block'
          }}
        >
          <FaGripVertical className="mr-2" />
        </span>
        <i className={classNames('asset-icon', 'mr-2')}></i>
        {props.name}
      </td>
      <td style={{ width: '21%' }}>
        {props.startDate}
      </td>
      <td style={{ width: '21%' }}>
        {props.endDate}
      </td>
      <td style={{ width: '13%' }}>
        {props.duration}
      </td>
      <td className={classNames('asset-toggle')} style={{ width: '7%' }}>
        <label className={classNames(
          'is_enabled-toggle',
          'toggle',
          'switch-light',
          'switch-material',
          'small',
          'm-0'
        )}>
          <input
            type="checkbox"
            checked={isEnabled}
            onChange={toggleIsEnabled}
            disabled={isDisabled || props.isProcessing === 1}
          />
          <span>
            <span className="off"></span>
            <span className="on"></span>
            <a></a>
          </span>
        </label>
      </td>
      <td className={classNames('asset_row_btns')}>
        <button
          className={classNames(
            'download-asset-button',
            'btn',
            'btn-outline-dark',
            'mr-1'
          )}
          type="button"
          disabled={isDisabled}
        >
          <FaDownload />
        </button>
        <button
          className={classNames(
            'edit-asset-button',
            'btn',
            'btn-outline-dark',
            'mr-1'
          )}
          type="button"
          disabled={isDisabled}
        >
          <FaPencilAlt />
        </button>
        <button
          className={classNames(
            'delete-asset-button',
            'btn',
            'btn-outline-dark'
          )}
          data-html="true"
          data-placement="left"
          data-title="Are you sure?"
          data-trigger="manual"
          type="button"
          disabled={isDisabled}
        >
          <FaTrashAlt />
        </button>
      </td>
    </tr>
  );
});
