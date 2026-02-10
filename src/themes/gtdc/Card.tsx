import CardContent from '../../CardContent';
import IconLabel from '../../IconLabel';
import LinkButton from '../../LinkButton';
import Title from '../../Title';
import ReadMore from '../../ReadMore';
import BaseCard from '../../BaseCard';
import { truncateText } from '../../utils/text.utils';
import theme from './theme.module.css';
import styles from './Card.module.css';
import type { ElementType } from 'react';
import type { Item } from '../../types';

interface CardProps {
  CustomLink?: ElementType | undefined;
  href: string;
  item: Item;
}

const Card = ({ CustomLink, href, item }: CardProps) => {
  const { title } = item;
  const { short_description, report_url } = item.custom_fields;

  return (
    <BaseCard className={theme.root} data-theme="gtdc">
      <CardContent position="middle">
        <Title {...{ CustomLink, href }} text={truncateText(title, 40)} height="52px" />
        {short_description ? (
          <div
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: truncateText(short_description, 250),
            }}
          />
        ) : null}
        <LinkButton small url={report_url}>
          <IconLabel as="span" icon="link" label="Read the latest report" />
        </LinkButton>
      </CardContent>
      <CardContent align="end" position="bottom">
        <ReadMore {...{ CustomLink, href, label: 'Learn More' }} />
      </CardContent>
    </BaseCard>
  );
};

export default Card;
