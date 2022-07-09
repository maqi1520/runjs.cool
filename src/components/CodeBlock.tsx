export const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  return (
    <pre className="code">
      <code className="break-all whitespace-pre-wrap">{code}</code>
    </pre>
  )
}
