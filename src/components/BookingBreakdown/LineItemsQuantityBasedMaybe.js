/**
 * Renders line items that have a `quantity` attribute and are not listed in the
 * LINE_ITEMS array in util/types.js
 */
import React from 'react';
import { intlShape } from 'react-intl';
import { formatMoney } from '../../util/currency';
import { humanizeLineItemCode } from '../../util/richText';
import { LINE_ITEMS, propTypes } from '../../util/types';

import css from './BookingBreakdown.css';

const LineItemsQuantityBasedMaybe = props => {
  const { transaction, intl } = props;

  // resolve quantity based line items which are not known
  const items = transaction.attributes.lineItems.filter(
    item => !!item.quantity && LINE_ITEMS.indexOf(item.code) === -1
  );

  return items.length > 0 ? (
    <React.Fragment>
      {items.map(item => {
        const label = humanizeLineItemCode(item.code);
        const formattedTotal = formatMoney(intl, item.lineTotal);
        return (
          <div key={item.code} className={css.lineItem}>
            <span className={css.itemLabel}>{label}</span>
            <span className={css.itemValue}>{formattedTotal}</span>
          </div>
        );
      })}
    </React.Fragment>
  ) : null;
};

LineItemsQuantityBasedMaybe.propTypes = {
  transaction: propTypes.transaction.isRequired,
  intl: intlShape.isRequired,
};

export default LineItemsQuantityBasedMaybe;
