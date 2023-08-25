interface Command {
  call(p: unknown): Promise<unknown>;
}

export default Command;
