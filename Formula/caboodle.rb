# DEPRECATED: Prefer installing via GitHub Packages:
#   npm install -g @abenjamin-ren/caboodle
# This formula is kept for backwards compatibility.
class Caboodle < Formula
  desc "OOUX Agent Skills that turn any AI coding assistant into an Object-Oriented UX facilitator"
  homepage "https://github.com/abenjamin-ren/Caboodle"
  url "https://github.com/abenjamin-ren/Caboodle/archive/refs/tags/v1.0.0.tar.gz"
  sha256 "PLACEHOLDER_SHA256"
  license "MIT"

  head "https://github.com/abenjamin-ren/Caboodle.git", branch: "main"

  depends_on "node" => "18"

  def install
    # Install all runtime files into the Homebrew prefix
    libexec.install "bin", "lib", "skills", "templates", "package.json"

    # Create a wrapper script that invokes the CLI via Node
    (bin/"caboodle").write <<~SH
      #!/bin/bash
      exec "#{Formula["node"].opt_bin}/node" "#{libexec}/bin/install.mjs" "$@"
    SH
  end

  test do
    assert_match "Caboodle", shell_output("#{bin}/caboodle --version")
  end
end
