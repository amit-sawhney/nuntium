interface AbstractCommand {
  call(p: unknown): Promise<unknown>;
}

export default AbstractCommand;
