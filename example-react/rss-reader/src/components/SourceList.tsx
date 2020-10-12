import React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux'
import { RssSource } from '../store/rss-source/types'
import { RootState } from '../store';

const sources: Array<RssSource> = [
    {
        id: 'une-inter',
        label: 'La Une International',
        url: 'https://www.lemonde.fr/international/rss_full.xml'
    },
    {
        id: 'une-fr',
        label: 'La Une France',
        url: 'https://www.lemonde.fr/rss/une.xml'
    }
];

const selectedSourceId = 'une-inter';
export interface OwnProps {
    propFromParent: number
}
interface DispatchProps {
    selectSource: (sourceId: string) => void
};
interface StateProps {
    sources: Array<RssSource>
}
type Props = StateProps & DispatchProps & OwnProps;

export const SourceList: React.FC<Props> = (props: Props) => {
    return (
        <div id="sourceList">
            {sources.map((source) => (
                <div key={source.id} className={source.id === selectedSourceId ? 'selected' : undefined}>
                    {source.label}
                </div>
            ))}
        </div>
    )
}

//const mapState: MapStateToPropsParam<StateProps, DispatchProps, {}> = (state: RootState): StateProps => ({
const mapState = (state: RootState): StateProps => ({
    sources: []
});

export default connect<StateProps, DispatchProps, {}>(
    mapState
)(SourceList)