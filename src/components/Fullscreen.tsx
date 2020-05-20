import React from 'react';

export interface FullScreenRenderProps {
  fullScreenActive: boolean;
  toggleFullScreen: () => Promise<void>;
}

export interface FullScreenState {
  fullScreenActive: boolean;
}

export interface FullScreenProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  render?: (props: FullScreenRenderProps) => React.ReactNode;
  children?: React.ReactNode | ((props: FullScreenRenderProps) => React.ReactNode);
}

export default class Fullscreen extends React.Component<FullScreenProps> {
  private el!: HTMLDivElement;

  public render() {
    return (
      <div
        id={this.props.id}
        className={this.props.className}
        style={this.props.style}
        ref={(el: HTMLDivElement) => {
          this.el = el;
        }}
      >
        {this.renderContent()}
      </div>
    );
  }

  public async startFullScreen(): Promise<void> {
    const el = this.el;
    const fn =
      el.requestFullscreen ||
      (el as any).msRequestFullscreen ||
      (el as any).mozRequestFullScreen ||
      (el as any).mozRequestFullscreen ||
      (el as any).webkitRequestFullScreen ||
      (el as any).webkitRequestFullscreen;

    if (fn) {
      const res = await fn.call(el);
      this.setState({ fullScreenActive: this.fullScreenActive() });
      return res;
    }
  }

  public async exitFullScreen(): Promise<void> {
    const fn =
      document.exitFullscreen ||
      (document as any).mozCancelFullScreen ||
      (document as any).webkitExitFullscreen;

    if (fn) {
      const res = await fn.call(document);
      this.setState({ fullScreenActive: this.fullScreenActive() });
      return res;
    }
  }

  public fullScreenActive(): boolean {
    const fullScreenEl =
      document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement;

    return !!fullScreenEl;
  }

  public async toggleFullScreen(): Promise<void> {
    if (this.fullScreenActive()) {
      return this.exitFullScreen();
    } else {
      return this.startFullScreen();
    }
  }

  private renderContent() {
    const renderProps: FullScreenRenderProps = {
      fullScreenActive: this.fullScreenActive(),
      toggleFullScreen: () => this.toggleFullScreen()
    };

    let render = this.props.render;
    if (!render && typeof this.props.children === 'function') {
      render = this.props.children as (props: FullScreenRenderProps) => React.ReactNode;
    }
    return render ? render(renderProps) : this.props.children;
  }
}
