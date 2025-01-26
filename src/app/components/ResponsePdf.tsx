import {
  Link,
  Page,
  Text,
  Document,
  StyleSheet,
  Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontFamily: 'Helvetica' },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  section: { marginBottom: 15 },
  heading: { fontSize: 12, marginBottom: 5, fontWeight: 'bold' },
  content: { fontSize: 12, marginBottom: 10, lineHeight: 1.5 },
  listItem: { fontSize: 12, marginBottom: 5 },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: { fontSize: 12, textAlign: 'center', lineHeight: 1.4 },
  link: { color: 'blue', textDecoration: 'underline' },
});
export const ResponsePdf = ({
  courseName,
  audienceInput,
  sessionInput,
  response,
}: {
  courseName: string;
  audienceInput: string;
  sessionInput: string;
  response: string;
}) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>{`Session Plan for ${courseName}`}</Text>
      <Text style={styles.heading}>Audience Description:</Text>
      <Text style={styles.content}>{audienceInput}</Text>
      <Text style={styles.heading}>Session Instructions:</Text>
      <Text style={styles.content}>{sessionInput}</Text>
      <Text style={styles.heading}>Suggested Plan:</Text>
      <Text style={styles.content}>{response}</Text>
      <Image src="/pdfmark.png" style={styles.image} />
      <Text style={styles.footerText}>
        Thank you for reading! If you found this content valuable, I invite you
        to connect with me on{' '}
        <Link
          style={styles.link}
          src="https://www.linkedin.com/in/chrisbolosan"
        >
          LinkedIn
        </Link>{' '}
        to learn more about my work and explore similar insights. I look forward
        to engaging with you!
      </Text>
    </Page>
  </Document>
);
