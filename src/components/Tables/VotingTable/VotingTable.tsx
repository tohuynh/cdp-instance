import React from "react";
import { VotingTableRow } from "../VotingTableRow";
import { EmptyRow } from "../EmptyRow";
import "@mozilla-protocol/core/protocol/css/protocol.css";

type VotingTableProps = {
  /** the name of the legislator */
  name: string;
  /** an array of Votes */
  votesPage: object[];
};

/*
This component is passed an array of Votes via the votesPage prop.
This is what a Vote looks like.
{
  matter: {
    id: vote.matter_ref,
    name: get_matter(vote.matter_ref).name,
    keywords: MAKE OPTIONAL FOR NOW
  },
  decision: vote.decision,
  council_decision: get_event_minutes_item(vote.event_minutes_item_ref).decision,
  event: {
    id: vote.event_ref,
    date: get_event(vote.event_ref).event_datetime,
    body_name: get_body(get_event(vote.event_ref).body_ref).name,
  }
}
*/

function renderEmpty(index: number) {
  return <EmptyRow key={`empty-table-row-${index}`} index={index} />;
}

function renderRows(votesPage: object[]) {
  const isEmpty = !votesPage || !votesPage.length || votesPage.length === 0;
  return (
    <tbody>
      {isEmpty && renderEmpty(0)}
      {votesPage.map((vote: any, index: number) => {
        if (!vote.matter || !vote.decision || !vote.event) return renderEmpty(index);
        const legislationName = vote.matter.name;
        const voteDecision = vote.decision;
        const councilDecision = vote.council_decision;
        const legislationLink = `/matters/${vote.matter.id}`;
        const tags = vote.matter.keywords;
        const meetingDate = vote.event.date;
        const meetingLink = `/events/${vote.event.id}`;
        const committeeName = vote.event.body_name;

        return (
          <VotingTableRow
            key={`voting-table-row-${index}`}
            index={index}
            legislationName={legislationName}
            voteDecision={voteDecision}
            councilDecision={councilDecision}
            legislationLink={legislationLink}
            legislationTags={tags}
            meetingDate={meetingDate}
            meetingLink={meetingLink}
            committeeName={committeeName}
          />
        );
      })}
    </tbody>
  );
}

function renderColGroup() {
  return (
    <colgroup>
      <col style={{ width: "30%" }} />
      <col style={{ width: "15%" }} />
      <col style={{ width: "20%" }} />
      <col style={{ width: "35%" }} />
    </colgroup>
  );
}

function renderHeaders(name: string) {
  return (
    <thead>
      <tr>
        <th scope="col">Legislation</th>
        <th scope="col">{name}&apos;s Vote</th>
        <th scope="col">Council Decision</th>
        <th scope="col">Meeting</th>
      </tr>
    </thead>
  );
}

const VotingTable = ({ name, votesPage }: VotingTableProps) => {
  return (
    <table className="mzp-u-data-table" style={{ width: "100%" }}>
      <caption>{name}&apos;s Voting Record</caption>
      {renderColGroup()}
      {renderHeaders(name)}
      {renderRows(votesPage)}
    </table>
  );
};

export default VotingTable;
